import { IoBookOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

import s from './TeacherCard.module.css'

export const TeacherCard = ({ teacher }) => {
    const [showMore, setShowMore] = useState(false);

    const clickReadMoreBtn = () => {
        setShowMore(v => !v)
    }

    const reviews = Array.isArray(teacher.reviews) ? teacher.reviews : []
    const length = reviews.length;    

    return (
        <div className={s.card}>
            <div className={s.teacher_photo_container}>
                <img className={s.teacher_photo} src={teacher.avatar_url} alt={`Teacher ${teacher.name} ${teacher.surname}`} />
            </div>
            <div>
                <div className={s.card_header}>
                    <p style={{ color: '#8A8A89', fontSize: '16px', fonrWeight: 500 }}>Languages</p>
                    <ul className={s.card_header_list}>
                        <li className={s.card_header_list_item}>
                            <IoBookOutline />
                            <p>Lessons online</p>
                        </li>
                        <li className={s.card_header_list_item}>
                            <p>Lessons done: {teacher.lessons_done}</p>
                        </li>
                        <li className={s.card_header_list_item}>
                            <FaStar className={s.star} />
                            <p>Rating: {teacher.rating}</p>
                        </li>
                        <li className={s.card_header_list_item}>
                            <p>Price / 1 hour: {teacher.price_per_hour}</p>
                        </li>
                    </ul>
                </div>
                <h3 className={s.card_title}>{`${teacher.name} ${teacher.surname}`}</h3>
                <ul className={s.languages_list}>
                    <span className={s.span_text}>Speaks: </span>
                    {teacher.languages.map((language, idx) => (
                        <li className={s.language_item} key={idx}>
                            {language}
                        </li>
                    ))} 
                </ul>
                <div className={s.lesson_info}>
                    <span className={s.span_text}>Lesson info: </span>
                    <p className={s.lesson_info_text}>{teacher.lesson_info}</p>
                </div>
                <ul className={s.conditions_list}>
                    <span className={s.span_text}>Conditions: </span>
                    {teacher.conditions.map((condition, idx) => (
                        <li className={s.conditions_item} key={idx}>
                            {condition}
                        </li>
                    ))}
                </ul>
                
                
                {showMore ? (
                    <div>
                        <button className={s.readMore_btn} onClick={clickReadMoreBtn}>
                            Hide all
                        </button>  
                        <p>{teacher.experience}</p>
                        <ul className={s.reviews_list}>
                            {reviews.slice(0, length).map(({ comment, reviewer_name, reviewer_rating }, idx) => (
                                <li className={s.review_item} key={idx}>
                                    <div className={s.logo}>
                                        {reviewer_name.slice(0,1)}
                                    </div>
                                    <p className={s.reviewer_name}>{reviewer_name}</p>
                                    <div className={s.rating}>
                                        <FaStar className={s.star} />
                                        <p>{reviewer_rating.toFixed(1)}</p>
                                    </div>
                                    <p className={s.comment}>{comment}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <button className={s.readMore_btn} onClick={clickReadMoreBtn}>
                        Read more
                    </button>    
                )}

                <ul className={s.levels_list}>
                    {teacher.levels.map((level, idx) => (
                        <li className={s.level} key={idx}>
                            #{level}
                        </li>
                    ))}
                </ul>

                {showMore && (
                    <button className={s.booking_btn}>
                        Book trial lesson
                    </button>
                )}
                
            </div>
            <button className={s.fav_btn}>
                <FaHeart />
            </button>
        </div>
    )
}