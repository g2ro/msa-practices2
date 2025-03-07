import React, {createContext, useContext} from 'react';

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
    return(
        <h3>MyComponent01</h3>
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
    return (
            <myContext.Provider value={{data : "hello world!!!!!"}}>
                <MyComponent />
            </myContext.Provider>
        
    );
}

export default App3;