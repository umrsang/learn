using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BoneVisionMgr : MonoBehaviour {
	public Transform[] bones;					//印射骨骼对象
	private Transform boneVisionMgr;		//管理器
	private List<Transform> boneVisions = new List<Transform>();        //印射对象
	private List<int> boneVisionIndexs = new List<int>();       //印射关系坐标
	private List<int> boneVisionIndexsRemove = new List<int>(); //用来移除的印射关系
	

	private void Start()
	{
		CheckBones();
		//创建管理器和印射骨骼
		boneVisionMgr = new GameObject("boneVisionMgr").transform;
		boneVisionMgr.SetParent(this.transform, false);
		boneVisions.Clear();
		for (int i = 0; i < boneVisionIndexs. Count; i++)
        {
			Transform t = new GameObject((i + 1).ToString()).transform;
			t.SetParent(this.boneVisionMgr, false);
			boneVisions.Add(t);
		}
	}


	//因为是动画，所以在update之后更新
	void LateUpdate()
    {
		//清除映射移除表
		boneVisionIndexsRemove.Clear();

		for (int i = 0; i < boneVisionIndexs.Count; i++)
        {
			int checkIndex = boneVisionIndexs[i];

			if (bones[checkIndex] == null  ||!bones[checkIndex].gameObject.activeSelf)
            {
				boneVisionIndexsRemove.Add(checkIndex);
				continue;
            }
			else
            {
				boneVisions[checkIndex].position = bones[checkIndex].position;
				boneVisions[checkIndex].rotation = bones[checkIndex].rotation;
			}
        }

        //清除无效值
        for (int i = 0; i < boneVisionIndexsRemove.Count; i++)
        {
			boneVisionIndexs.Remove(boneVisionIndexsRemove[i]);
		}
    }

	private void CheckBones()
    {
		boneVisionIndexs.Clear();
		for (int i = 0; i < bones.Length; i++)
        {
			if (bones[i]==null)
            {
				Debug.LogWarningFormat("第{0}个骨骼点为空,如不使用请清理",i+1);
            }
            else
            {
				boneVisionIndexs.Add(i);
                if (!bones[i].gameObject.activeSelf)
                {
					bones[i].gameObject.SetActive(true);
					Debug.LogWarningFormat("第{0}个骨骼点{1}未激活,已激活", i + 1,bones[i].name);
				}
			}
        }
    }


}
