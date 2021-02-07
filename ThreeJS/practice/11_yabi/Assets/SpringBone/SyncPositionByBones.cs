using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SyncPositionByBones : MonoBehaviour 
{
	public static void Start(GameObject go, Transform targetBone, Transform originBone)
	{
		SyncPositionByBones syncPos = go.GetComponent<SyncPositionByBones> ();
		if (syncPos == null)
		{
			syncPos = go.AddComponent<SyncPositionByBones> ();
		}
		syncPos.targetBone = targetBone;
		syncPos.originBone = originBone;
		syncPos.enabled = true;
	}

	public static SyncPositionByBones Get(GameObject go)
	{
		SyncPositionByBones syncPos = go.GetComponent<SyncPositionByBones> ();
		if (syncPos == null)
		{
			syncPos = go.AddComponent<SyncPositionByBones> ();
		}
		return syncPos;
	}

	public Transform originBone;
	public Transform targetBone;

	public void LateUpdate()
	{
		if (originBone == null || targetBone == null)
		{
			return;
		}
		Vector3 rootDeltaPos = transform.position - targetBone.position;
		Vector3 finalPos = originBone.position + rootDeltaPos;
		transform.position = finalPos;
	}
}
