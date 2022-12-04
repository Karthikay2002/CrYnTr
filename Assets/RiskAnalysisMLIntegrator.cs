using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;

public class RiskAnalysisMLIntegrator : MonoBehaviour
{

    [DllImport("__Internal")]
    private static extern void GameOver(int score);

    public GameObject[] islands;
    public GameObject[] RiskDetector;

    public void Analyse()
    {
        for(int i = 0; i<islands.Length; i++)
        {
            if(islands[i].activeInHierarchy)
            {
                //GameOver(i);
                RiskDetector[i].SetActive(true);
            }
        }
    }

    public void close()
    {
        for(int i=0; i<RiskDetector.Length; i++)
        {
            if(RiskDetector[i].activeInHierarchy)
            {
                RiskDetector[i].SetActive(false);
                break;
            }
        }
    }
}
