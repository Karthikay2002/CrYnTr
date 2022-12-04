using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SwitchIslands : MonoBehaviour
{
    public GameObject[] islands;
    public int islandNumber = 0;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    public void ChangeIsland()
    {
        Debug.Log("wprling");
        islands[islandNumber].SetActive(false);
        islandNumber = (islandNumber + 1) % 4;
        islands[islandNumber].SetActive(true);
    }
}
