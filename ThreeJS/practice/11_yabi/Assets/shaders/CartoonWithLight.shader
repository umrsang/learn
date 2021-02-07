Shader "aounity/particle04/charactertoon/CartoonWithLight"
{
	Properties
	{
		_Color("Color Tint",Color)=(1,1,1,1)
		_MainTex ("Texture", 2D) = "white" {}
		_DarkTex("DarkTex", 2D) = "white" {}
		_OutlineColor ("OutlineColor", Color) = (0,0,0,1)
		_OutlineWidth ("Outline width", Range(0.01, 2)) = 0.24
		_FirstShadowColor ("FirstShadow Color", Color) = (0.5, 0.5, 0.5, 1)
		_SecondShadowColor("SecondShadow Color", Color) = (0.5, 0.5, 0.5, 1)
		_ThirdShadowColor("ThirdShadow Color", Color) = (0.5, 0.5, 0.5, 1)
		_LambertOffset("Lambert Offset",Range(0,1)) = 0.5
		_Specular ("SpecularColor", Color) = (1, 1, 1, 1)
		_SpecularScale("Specular Scale",Range(0,1)) = 0.5
		_BloomSmooth("BloomSmooth",Range(0,10)) = 0.5
		_Saturation("Saturation", Range(0,5)) = 1
	}
	SubShader
	{		
		Pass
		{	
			Tags { "RenderType" = "Opaque" }
			Cull Front
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			
			#include "UnityCG.cginc"

			struct v2f
			{
				float4 vertex : SV_POSITION;
			};

			sampler2D _MainTex;
			float4 _MainTex_ST;

			float4 _OutlineColor;
			float _OutlineWidth;
			
			v2f vert (appdata_full v)
			{
				v2f o;	
				float4 pos = UnityObjectToClipPos(v.vertex);
				float3 viewNormal = mul((float3x3)UNITY_MATRIX_IT_MV, v.normal.xyz);
				//float3 viewNormal = mul((float3x3)UNITY_MATRIX_IT_MV, v.tangent.xyz);
				float2 ndcNormal = normalize(TransformViewToProjection(viewNormal.xy)) * pos.w;
				float4 nearUpperRight = mul(unity_CameraInvProjection, float4(1, 1, UNITY_NEAR_CLIP_VALUE, _ProjectionParams.y));
				float aspect = abs(nearUpperRight.y / nearUpperRight.x);
				ndcNormal.x *= aspect;
				pos.xy += 0.01 * _OutlineWidth * v.color.r * ndcNormal.xy;
				//pos.xy += (v.color.r - 0.5)*0.01;
				o.vertex = pos;
				return o;
			}
			
			fixed4 frag (v2f i) : SV_Target
			{
				fixed4 col = _OutlineColor;
			col.a = 0.5;
				return col;
			}
			ENDCG
		}

        //  // 阴影渲染通道（Shadow Caster pass）
        //  // 将将物体的深度渲染到阴影贴图或深度纹理中
        // Pass 
        // {
        //     //设置通道名称
        //     Name "ShadowCaster"
        //     //于通道标签中设置光照模型为ShadowCaster。
        //     //此光照模型代表着将物体的深度渲染到阴影贴图或深度纹理。
        //     Tags { "LightMode" = "ShadowCaster" }

        //     //开启深入写入模式
        //     ZWrite On 
        //     //设置深度测试模式：小于等于
        //     ZTest LEqual

        //     //===========开启CG着色器语言编写模块===========
        //     CGPROGRAM

        //     //着色器编译目标：Model 3.0
        //     #pragma target 3.0

        //     //编译指令：不使用GLES渲染器编译
        //     #pragma exclude_renderers gles


        //     // ---------编译指令：着色器编译多样化--------
        //     #pragma shader_feature _ _ALPHATEST_ON _ALPHABLEND_ON _ALPHAPREMULTIPLY_ON

        //     //--------着色器编译多样化快捷指令------------
        //     //进行阴影投射相关的多着色器变体的编译
        //     #pragma multi_compile_shadowcaster

        //     //编译指令：告知编译器顶点和片段着色函数的名称
        //     #pragma vertex vertShadowCaster
        //     #pragma fragment fragShadowCaster

        //     //包含辅助CG头文件
        //     #include "UnityStandardShadow.cginc"

        //     //===========结束CG着色器语言编写模块===========
        //     ENDCG
        // }
    
		Pass
		{
			Tags { "LightMode" = "ForwardBase" }

			Cull Back
			CGPROGRAM

			#pragma vertex vert
			#pragma fragment frag
			// #pragma multi_compile_fwdbase

			#include "UnityCG.cginc"
			#include "AutoLight.cginc"
			#include "Lighting.cginc"

			struct appdata
			{
				float4 vertex : POSITION;
				float2 uv : TEXCOORD0;
				float3 normal : NORMAL;
				float4 color : COLOR;
			};

			struct v2f
			{
				float2 uv : TEXCOORD0;
				float4 pos : SV_POSITION;
				float3 viewDir : TEXCOORD1;
				fixed4 color0 : TEXCOORD2;
				float LambertLis : TEXCOORD3;
				float3 worldNor : TEXCOORD4;
				float3 worldPos : TEXCOORD5;
				float3 normal : TEXCOORD6;
				// SHADOW_COORDS(7)
			};

			sampler2D _MainTex;
			float4 _MainTex_ST;

			sampler2D _DarkTex;
			fixed4 _Color;
			fixed4 _FirstShadowColor;
			fixed4 _SecondShadowColor;
			fixed4 _ThirdShadowColor;
			fixed4 _Specular;
			fixed _SpecularScale;
			fixed _BloomSmooth;
			half _Saturation;
			float _BloomFactor;
			float _LambertOffset;

			v2f vert(appdata v)
			{
				v2f o;
				o.pos = UnityObjectToClipPos(v.vertex);
				o.uv = TRANSFORM_TEX(v.uv, _MainTex);
				o.viewDir = normalize(WorldSpaceViewDir(v.vertex));
				o.color0 = v.color;
				o.normal = normalize(UnityObjectToWorldNormal(v.normal));;
				o.worldNor = normalize(mul(float4(v.normal,0), unity_WorldToObject).xyz);
				o.LambertLis = dot(normalize(_WorldSpaceLightPos0.xyz), o.worldNor) * 0.5 + _LambertOffset;
				o.worldPos = mul(unity_ObjectToWorld,v.vertex).xyz;
				// TRANSFER_SHADOW(o);
				return o;
			}

			fixed4 frag(v2f i) : SV_Target
			{
				fixed3 worldLightDir = normalize(UnityWorldSpaceLightDir(i.worldPos));
				fixed3 worldViewDir = normalize(UnityWorldSpaceViewDir(i.worldPos));
				fixed3 worldHalfDir = normalize(worldLightDir + worldViewDir);

				fixed4 col = tex2D(_MainTex, i.uv) * _Color;
				fixed4 darkwcol = tex2D(_DarkTex, i.uv);

				fixed gray = 0.2125 * col.r + 0.7154 * col.g + 0.0721 * col.b;
				fixed3 grayColor = fixed3(gray, gray, gray);
				col.rgb = lerp(grayColor, col.rgb, _Saturation);

				fixed diff = i.LambertLis * (darkwcol.r + 0.5);
				//fixed3 diffuse = col.rgb;

				fixed3 shadow = col.rgb * _FirstShadowColor * lerp(0.9, 1, darkwcol.r);

				/*if (darkwcol.g == 0)
				{
					shadow *= _FirstShadowColor.rgb;
				}
				else if(darkwcol.g == 1)
				{
					shadow *= _SecondShadowColor.rgb;
				}
				else
				{
					shadow *= _ThirdShadowColor.rgb;
				}*/

				half bloom = step(0.5,diff);
				bloom = 1 - smoothstep(0, _BloomSmooth, bloom);

				//fixed spec = dot(i.normal, worldHalfDir);
				//fixed w = fwidth(spec) * 2.0;
				//fixed spec = dot(i.normal, (UNITY_MATRIX_V[2].xyz + fixed3(180, 45, 0))) * 0.5 + 0.5;
				//fixed specular = step(0.99, spec) * darkwcol.b;
				//specular = spec * 0.3 * darkwcol.b;
				//specular *= diff > 0.5 ? 1 : 0;
				//specular *= spec;

				col.rgb = lerp(shadow, col.rgb, diff > 0.5 ? 1 : 0);
				//col.a = lerp(0, 1, 1 - specular + _SpecularScale);
				col.a = 1 - darkwcol.b * _SpecularScale * 0.5;

				// fixed systemshadow = SHADOW_ATTENUATION(i);
				// col.rgb *= systemshadow;

				//col = fixed4(col.rgb, 1 - darkwcol.b);

				return col;
			}
			ENDCG
		}
	}
	FallBack "Specular"
}
