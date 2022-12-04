import numpy as np
import tensorflow as tf
import yfinance as yf
import uvicorn
from fastapi import FastAPI



app = FastAPI()
def fun_predict(list_inputs, path ):
  '''
  Function is used to change the input to suit the input shape of the model.
  '''
  y_tes = np.array([list_inputs], dtype='float64')
  y_tes = tf.constant(y_tes)
  y_tes= tf.expand_dims(y_tes, axis = -1)
  saved_standard_model = tf.keras.models.load_model(path)
  output = saved_standard_model.predict(y_tes)
  return output[0][:2]

def get_current_price(symbol):
    '''
    gets the current price of the currency.
    '''
    ticker = yf.Ticker(symbol)
    todays_data = ticker.history(period='1d')
    list_out = [round(todays_data['Open'][0],3), round(todays_data['High'][0],3), round(todays_data['Low'][0],3), round(todays_data['Close'][0],3)]
    return list_out
    
def per_clac(a, p):
  fin = ((p-a)/a)
  return fin

# [hot, plesant, rainy, thunderstrom]
def climate_model(currency):
  y_today = get_current_price(currency)
  path = f'model_{currency}.h5'
  y_future= fun_predict(y_today, path)
  o_a, h_a, = y_today[0], y_today[1]
  o_p, h_p, = y_future[0], y_future[1]
  o_per = (per_clac(o_a, o_p))
  h_per = (per_clac(h_a, h_p))

  if o_per >= 0.02 and h_a >= 0.02:
    final_val = 1
 
  elif o_per < 0.07 or h_per < 0.07:
    final_val = 3

  else:
    final_val = 2

  return final_val
  
@tf.function
@app.get("/")  
def get_four_climate():
    j= 0
    climatex =[0,0,0,0]
    curr = ["AAVE-USD","ETH-USD","MATIC-USD","SOL-USD"]
    for i in curr:
        climatex[j] = climate_model(i)
        j+=1

    return{"AAVE": climatex[0],"ETH": climatex[1],"MATIC": climatex[2],"SOL": climatex[3]}

if __name__ == '__main__':
      uvicorn.run(app, host = '0.0.0.0', port =80)




