import React from "react";
import { Link } from "react-router-dom";

import style from "./Card.module.css";

function Card(props) {
  //   return (
  //     <div className="card">
  //       <div>
  //         <img src={props.person} className="cardimg" />
  //         <div className="cardstats">
  //           <img src={props.star} className="cardstar" />
  //           <span>{props.rating}</span>
  //           <span className="grey">{props.ranking} </span>
  //           <span className="grey">{props.country}</span>
  //         </div>
  //         <p>{props.title}</p>
  //         <p>
  //           <span className="bold">{props.price}</span> / person
  //         </p>
  //       </div>
  //     </div>
  //   );

  return (
    <div className={style.card} key={props.id}>
      <Link to={`/blog/${props.id}`}>
        <h2 className={style.title}>{props.title}</h2>
        <img src={props.pic} className={style.cardImg} />
        <h3>Click to read more...</h3>
        <p className={style.bold}>Written by {props.author} </p>
        <span>{new Date(props.date).toDateString()}</span>
      </Link>
    </div>
  );
}

export default Card;
