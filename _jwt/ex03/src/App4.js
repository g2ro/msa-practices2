import React, {createContext, useContext, useState} from 'react';

const myContext = createContext();

function MyComponent(){
    return(
        <>
            <h1>MyComponent</h1>
            <MyComponent01 />
            <MyComponent02 />
        </>
    )
}

function MyComponent01(){
    const {setData} = useContext(myContext);
    return(
        <>
            <h3>MyComponent01</h3>
            <button onClick={() => setData('Hello world')}>set data</button>
        </>
    )
}

function MyComponent02(){
    const {data} = useContext(myContext);
    return(
        <>
        <h3>MyComponent02</h3>
        <dl>
            <dt>data</dt>
            <dd>{data}</dd>
        </dl>
        </>
    )
}

function App3(props) {
    const dataState = useState(""); // dataState = [data, setData] 이런식으로 배열 타입
    return (
            <myContext.Provider value={{data : dataState[0], setData: dataState[1]}}>
                <MyComponent />
            </myContext.Provider>
        
    );
}

export default App3;