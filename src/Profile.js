import React, { useState ,useEffect } from 'react';
import { Card } from 'antd';
import { MailOutlined, PhoneOutlined, GlobalOutlined, HeartOutlined, HeartFilled, EditOutlined, DeleteFilled } from '@ant-design/icons';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function Cards({cardsData, setcardsData}) {

  const [temp, setTemp] = useState(0)
  const [liked, setLiked] = useState(false)
  const [formData, setFormData] = useState()

  const [ids, setIds] = useState()
  console.log(ids)

  // const ids = [1,2,3,4,5,6,7,8,9,10];
  
  const { Meta } = Card;

  
  const Title = ({title}) => {
    return (
      <h3>{title}</h3>
    )
  }
  const Hero = ({name}) => {
    // console.log(name)
    return (
      <div className="card_head_image">
        <img alt='' src={`https://avatars.dicebear.com/v2/avataaars/${name}.svg?options[mood][]=hap`} />
      </div>
    )
  }
  const Description = ({email, phone, website}) => {
    return (
        <div className='card_body_detail'>
          <div>
          <MailOutlined />
            <span>{email}</span>
          </div>

          <div>
          <PhoneOutlined />
            <span>{phone}</span>
          </div>

          <div>
          <GlobalOutlined />
            <span>{website}</span>
          </div>
                  
        </div>
    )
  }
  const BasicModal = (cardData) => {
    // console.log(cardData)

    let refName = cardData.name;
    let refEmail = cardData.email;
    let refPhone = cardData.phone;
    let refWebsite = cardData.website;
    
    
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='modal'>
            <div className="main_modal">
              <div className='modal_header'>
                <div className='modal_title'>Basic Modal</div>
                <div onClick={() => onClose()} style={{cursor: 'pointer'}}>X</div>
              </div>

              <div className="modal_form">
                <div>
                  <label htmlFor="name">Name :</label>
                  <input type="text" id="name" placeholder={cardData.name} onChange={(e) => refName = e.target.value} />
                </div>
                
                <div>
                  <label htmlFor="email">Email :</label>
                  <input type="text" id="email" placeholder={cardData.email} onChange={(e) => refEmail = e.target.value} />
                </div>
                <div>
                  <label htmlFor="phone">Phone :</label>
                  <input type="text" id="phone" placeholder={cardData.phone} onChange={(e) => refPhone = e.target.value} />
                </div>
                <div>
                  <label htmlFor="website">Website :</label>
                  <input type="text" id="website" placeholder={cardData.website} onChange={(e) => refWebsite = e.target.value} />
                </div>

              </div>

              <div className="modal_footer">
                <div>
                  <button  onClick={() => onClose()}>Cancel</button>
                  <button onClick={() => {
                        const data = {
                          id :	cardData.id,
                          name :	refName,
                          username :	cardData.username,
                          email :	refEmail,
                          address: cardData.address,
                          phone :	refPhone,
                          website :	refWebsite,
                          company	: cardData.company,     
                        }
                        const findIndex = cardsData.findIndex(e => e.id === cardData.id);
                        cardsData.splice((findIndex), 1)
                        cardsData.splice((findIndex), 0, data)
                        setTemp(temp+1)
                        setFormData(data)
                        onClose()

                  }}>OK</button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    })}

  const CardOptions = ({ cardData, id }) => {

    const handleDelete = () => {
      const findIndex = cardsData.findIndex(e => e.id === id);
      cardsData.splice((findIndex), 1)
      setcardsData(cardsData)
      // console.log(cardsData)
      setTemp(temp+1)

    }

    
    return (
      <div className='buttons'>
        {id === 1 ? (
          <button onClick={() => {setLiked(!liked); setIds(id)}} className='favourite'>
          {liked ? (
            <HeartFilled style={{ color: 'red' }} />
            ) : (
            <HeartOutlined style={{ color: 'red' }} />
          )}
        </button>
        ) : (
          <button onClick={() => {setIds(id)}} className='favourite'>
            <HeartOutlined style={{ color: 'red' }} />
        </button>
        )}
        <button onClick={() => BasicModal(cardData)} className='edit'>
          <EditOutlined />
        </button>

        <button onClick={handleDelete} className='delete'>
          <DeleteFilled />
        </button>

      </div>
    )
  }


  function AllCards () {

    return (
      cardsData.map(cardData => ( 
        <Card
          key={cardData.id}
          className='card'
        >
          <Meta
            description={<Hero name={cardData.name} />}
          />
          <div className="card_body">
          <div className='card_body_main'>
              <Meta
                description={<Title title={cardData.name} />}
              />
              <Meta
                description={<Description email={cardData.email} phone={cardData.phone}  website={cardData.website} />}
              />
          </div>
  
          <Meta
            description={<CardOptions cardData={cardData} id={cardData.id} />}
          />
          </div>
        </Card>
        ))
    )
  }

  
  useEffect(() => {
    AllCards()
  })

    return( 
<>
      {AllCards()}
</>
    )}