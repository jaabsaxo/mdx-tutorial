const description =`
>ChartInfo
Holds information about the charts data being fetched. For example what exchange the data is coming from, if its delayed and what the horizon is.
-3,8
>Data
Array holding the individual OHLC samples. For Forex Instruments both Bid and Ask values are returned. For other instruments the values are the last traded values.
-9,32
>DataVersion
Unix timestamp for when data was stored in Saxo Banks servers cache. This number changes whenever data the cache is flushed, 
the server is restarted or if data is updated. It also depends on which of our servers you reach.
-33,33
>DisplayAndFormat
Object holding information relevant to displaying the instrument and formatting the samples for charting it. 
Currently holds the symbol of the instrument, how many decimals samples have, a description of the instrument and what currency it is traded in.
-34,40
` 

export default description;