import React, {useEffect, useState} from "react";
import './TODO.css';
const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list);
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    } else{
        return [];
    }
}
const TODO = () =>{
    const [value1, setvalue1] = useState("");
    const [items, setItems] = useState(getLocalItems());
    const [toggle, settoggle] = useState(true);
    const [editItem, SetIsEditItem] = useState(null);
    const additem = () => {
        if(!value1){
            alert("Please Fill Data");
        } else if(value1 && !toggle){
            setItems(
                items.map((ele)=>{
                    if(ele.id === editItem){
                        return {...ele, name: value1}
                    }
                    return ele;
                })
            );
            settoggle(true);
            setvalue1('');
            SetIsEditItem(null);
        }else{
            const AllInput = {id: new Date().getTime().toString(), name: value1}
            const updateitem = [...items, AllInput];
            setItems(updateitem);
            setvalue1("");
        }
    }
    const deleteitem = (index) =>{
        console.log(index);
        const update = items.filter((ele)=> ele.id !== index);
        setItems(update);
    }
    const edititem = (idv) => {
        let newEdit = items.find((elem) => {
            return elem.id === idv;
        });
        settoggle(false);
        setvalue1(newEdit.name);
        SetIsEditItem(idv);
    }
    const removeall = () => {
        setItems([]);
    }
    useEffect(()=>{
        localStorage.setItem("lists",JSON.stringify(items));
    },[items]);
    return (
        <>
            <h1 className="h1">COMPLETE TODO!</h1>
            <input 
                className="IP"
                type="text"
                placeholder="Add Item"
                onChange={(e)=>setvalue1(e.target.value)}
                value = {value1}
            />
            {
                toggle ? <button onClick={additem} className="btn">Submit</button> : 
                <button onClick={additem} className="btn">Edit</button>
            }
            <div className="LBOX">
                {
                    items.map((i)=>{
                        return(
                            <div key = {i.id} className="LIB">
                                <p>{i.name}</p>
                                <div className="BTNBX">
                                <button className="btn2" onClick={()=>deleteitem(i.id)}>Delete</button>
                                <button className="btn2" onClick={() => edititem(i.id)}>Edit</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <button className="btn1" onClick = {removeall}><span>Delete All</span></button>
        </>
    );
}
export default TODO;