import Header from "./components/Header";
import LeftNavCol from "./components/LeftNavCol";
import CenterLearnCol from "./components/CenterLearnCol";
import LevelNavBar from"./components/LevelNavBar";
import React from 'react';


export default function Learn(props) {
//   const [toggled, setToggled] = React.useState(false);

//   const toggleHint = () => setToggled(!toggled);

  return (
    <>
      <Header/>
      <div className="column flex-row-center">
        <LeftNavCol/>

        { props.isLevel ? 
            props.globalName ? 
              <div>
                  <LevelNavBar />
                  <CenterLearnCol globalName={props.globalName}/>
              </div> : 
              <p className="line-height-dense correct">Please go to the survey and fill it out first</p>
           : 
           <CenterLearnCol/>
        }
      </div>
    </>
  );
}