//创角场景 船体用

Shader "aounity/scene/unlit_scene_createrole"
{
    Properties
    {
        _MainTex ("Base Texture (RGB)", 2D) = "white" {}
        _HighlightCol("Hightlight Color",Color) = (0.8,0.8,0.8,1)
        _ShadowCol("Shadow Color",Color) = (0.2,0.2,0.2,1)
        _RampThreshold("Ramp Threshold",Range(0.1,1)) = 0.5
        _RampSmooth("Ramp Smooth",Range(0,1)) = 0.1
        _RimColor("Rim Color", Color) = (0.8, 0.8, 0.8, 0.6)
        _RimThreshold("Rim Threshold", Range(0, 1)) = 0.5
        _RimSmooth("Rim Smooth", Range(0, 1)) = 0.1
        _OutlineWidth("OutlineWidth", Range(0, 0.5)) = 0.01
        _OutlineColor("OutlineColor", Color) = (0,0,0,1)
        _SubLight("SubLight", Range(1,2)) = 1
    }

    SubShader
    {
        Fog { Mode Off }

        Pass {
            Tags { "RenderType"="Opaque" "Queue"="Geometry" "IgnoreProjector"="True" "LightMode" = "ForwardBase"}
            LOD 100         
            Name "Outline"
            Cull Front
            //ZWrite Off

            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            #pragma fragmentoption ARB_precision_hint_fastest
            //#pragma multi_compile __ OUTLINE_ON OUTLINE_OFF
            uniform float _OutlineWidth;
            uniform float4 _OutlineColor;
 
            struct v2f {
                float4 pos : SV_POSITION;
            };

            v2f vert(appdata_base v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                //#if OUTLINE_ON
                float3 vnormal = mul((float3x3)UNITY_MATRIX_IT_MV, v.normal);
                float2 extendDir = normalize(TransformViewToProjection(vnormal.xy));
                o.pos.xy += extendDir * o.pos.w * _OutlineWidth * 0.01;
                //#endif
                return o;
            }
            fixed4 frag(v2f i) : SV_Target {
                #if OUTLINE_OFF
                discard;
                #endif
                return fixed4(_OutlineColor.rgb, 1);
            }
            ENDCG
        }

        Pass
        {
            Tags { "RenderType"="Opaque" "Queue"="Geometry" "IgnoreProjector"="True" "LightMode" = "ForwardBase"}
            LOD 100         
            // Offset -1, 0
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fwdbase      // for shadow

            #include "Lighting.cginc"
            #include "AutoLight.cginc"
            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float3 normal : NORMAL;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float4 pos : SV_POSITION;
                float2 uv : TEXCOORD0;
                float3 worldPos : TEXCOORD1;
                float3 worldNormal : TEXCOORD2;
                float3 viewDir : TEXCOORD3;
                float3 lightDir : TEXCOORD4;
                SHADOW_COORDS(5)
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;
            fixed _RampThreshold;
            float _RampSmooth;
            fixed4 _HighlightCol;
            fixed4 _ShadowCol;
            fixed4 _RimColor;
            fixed _RimThreshold;
            float _RimSmooth;
            float _SubLight;
            

            v2f vert (appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
                o.worldNormal = mul(float4(v.normal, 0), unity_WorldToObject).xyz;
                o.viewDir = normalize(_WorldSpaceCameraPos.xyz - o.worldPos.xyz).xyz;
                o.lightDir = WorldSpaceLightDir(v.vertex);
                TRANSFER_SHADOW(o)
                return o;
            }
            
            fixed4 frag (v2f i) : SV_Target
            {
                fixed4 col = tex2D(_MainTex, i.uv);
                fixed shadow = SHADOW_ATTENUATION(i);
                fixed3 normalDir = normalize(i.worldNormal);
                fixed3 viewDir = normalize(i.viewDir);
                fixed3 lightDir = normalize(i.lightDir);
                fixed ndl = max(0, dot(normalDir, lightDir));
                fixed3 ramp = smoothstep(_RampThreshold - _RampSmooth * 0.5, _RampThreshold + _RampSmooth * 0.5, ndl);
                _ShadowCol = lerp(_HighlightCol, _ShadowCol, _ShadowCol.a);
                fixed3 rampColor = lerp(_ShadowCol.rgb, _HighlightCol.rgb, ramp);
                float ndv = max(0, dot(normalDir, viewDir));
                float rim = (1.0 - ndv) * ndl;
                rim = smoothstep(_RimThreshold - _RimSmooth * 0.5, _RimThreshold + _RimSmooth * 0.5, rim);
                fixed3 rimColor = _RimColor.rgb * _RimColor.a * rim;
                fixed4 finalCol;
                finalCol.rgb = col.rgb * rampColor * _LightColor0 + rimColor;
                finalCol.a = col.a;
                return finalCol * shadow / _SubLight;
            }
            ENDCG
        }


        Pass
        {
            Tags { "RenderType"="Opaque" "LightMode" = "ForwardAdd"} 
            Blend One One
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            #pragma target 3.0

            #include "AutoLight.cginc"
            #pragma multi_compile_fwdadd_fullshadows

            sampler2D _MainTex;
            float4 _MainTex_ST;
            float4 _LightColor0;

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
                float4 normal:NORMAL;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 pos: SV_POSITION;
                float3 normal :TEXCOORD1;
                float4 wPos :TEXCOORD2;
                LIGHTING_COORDS(3,4)
            };

            v2f vert (appdata v)
            {
                v2f o;
                o.pos= UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                o.wPos= mul(unity_ObjectToWorld, v.vertex);
                o.normal = v.normal;
                TRANSFER_VERTEX_TO_FRAGMENT(o)
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                float3 N = normalize(UnityObjectToWorldNormal(i.normal));
                float3 L = normalize (lerp(_WorldSpaceLightPos0.xyz , _WorldSpaceLightPos0.xyz - i.wPos.xyz , _WorldSpaceLightPos0.w));
                float atten = LIGHT_ATTENUATION(i);
                fixed4 col = tex2D(_MainTex, i.uv);
                col.rgb = col.rgb * _LightColor0.rgb * saturate(dot(N,L))*atten;
                return col;
            }
            ENDCG
        }       
    }

    FallBack "Diffuse"
}
