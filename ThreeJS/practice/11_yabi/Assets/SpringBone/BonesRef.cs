using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BonesRef : MonoBehaviour {
	public Transform[] bones;
	private Dictionary<string, Transform> _mapBones;

	public Transform GetBone(string name)
	{
		MapBones ();
		if (_mapBones != null)
		{
			Transform bone = null;
			_mapBones.TryGetValue (name, out bone);
			return bone;
		}
		return null;
	}

	void MapBones()
	{
		if (_mapBones==null&&bones != null)
		{
			_mapBones = new Dictionary<string, Transform> ();
			for(int i = 0; i < bones.Length; ++i)
			{
				if (bones[i] != null)
				{
					_mapBones [bones [i].name] = bones [i];
				}
			}
		}
	}
}
