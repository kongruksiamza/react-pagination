import FoodComponent from "./components/FoodComponent";
import {useEffect, useState} from "react"
import MenuData from "./data/MenuData";
import './App.css'

function App() {
  const [foodData,setFoodData] = useState(MenuData)
  const [dataInPage,setDataInPage] = useState([])
  const [page,setPage] = useState(0)

  
  // ข้อมูลทั้งหมด 10 รายการ
  // จำนวนรายการแต่ละหน้า
  // จำนวนเลขหน้า = ข้อมูลทั้งหมด / จำนวนรายการแต่ละหน้า
  // 14 รายการ 14/7 = 2 
  // 0 = [0-6] , 1 = [7-13]

  const pagination=()=>{
      const foodPerPage = 3 // แสดงรายการอาหาร 7 รายการต่อ 1 หน้า
      const pages = Math.ceil(MenuData.length / foodPerPage)
      const newFood = Array.from({length:pages},(data,index)=>{
          const start = index * foodPerPage // [0,] , [7,]
          return MenuData.slice(start,start+foodPerPage)
      })
      return newFood
  }

  const handlePage=(index)=>{
      setPage(index)
  }
  useEffect(()=>{
      const paginate = pagination()
      setDataInPage(paginate)
      setFoodData(paginate[page])
  },[page])

  return (
    <div className="App">
        <h1>FoodCard | Pagination</h1>
        <div className="container">
          {foodData.map((data,index)=>{
              return <FoodComponent key={index} {...data}/>
          })}
        </div>
        <div className="pagination-container">
          {dataInPage.map((data,index)=>{
              return(
                <button 
                key={index} 
                onClick={()=>handlePage(index)}
                className={`page-btn ${index === page ? "active-btn" : null}`}
                >{index+1}</button>
              )
          })}
        </div>
    </div>
  );
}

export default App;
