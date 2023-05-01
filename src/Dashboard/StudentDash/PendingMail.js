import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Table from 'react-bootstrap/Table'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import DeleteMailButton from './DeleteMailButton';

import { Button } from 'react-bootstrap'

const PendingMail = ({ senderId, senderName }) => {
    const [mails, setMails] = useState(null)
    const [reload, setReload] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios.post('https://leaveapp-api.onrender.com/mails/students/pending', { senderId })
        .then(response => {
            const mailsData = response.data
            setMails(mailsData);
        })
        .catch(error => {
            console.log(error);
        });
    }, [reload]);

    const DeleteMailButton = ({ mail_id }) => {

        console.log(mail_id)
        const handleDelete = () => {
            console.log(mail_id, "from handleDelete")

            axios.delete('https://leaveapp-api.onrender.com/mails', { data: { _id: mail_id } })
                .then(response => {
                    const reply = response.data.message
                    console.log(reply)
                    setReload(!reload)
                })
                .catch(error => {
                    console.log(error)
                })
        }

        return (
            <Button variant='secondary' onClick={() => handleDelete()}><FontAwesomeIcon icon={ faTrash }/></Button>
        )
    }

    return (
        <div className='bagc'>
        <div className='container'>
            <h4><div className='mail_head'>Your Pending Applications</div></h4>
            <div className='table-container'>
            <Table striped  hover >
                
                {mails?.length ? (
                    <thead>
                        <tr>
                    
                            <th className='t_head'>Subject</th>
                            <th className='t_head'>Status</th>
                            <th className='t_head'>Sent to</th>
                            <th className='t_head'>Edit</th>
                            <th className='t_head'>Delete</th>
                        </tr>
                    </thead>
                ) : <></>}
                        
                {mails?.length ?(
                    mails.map(mail=>(
                        <tbody>
                                <tr key={mail._id}>
                                    <td ><p className='t_cont'>{mail.subject}</p></td>
                                    <td ><p className='t_cont'>{mail.status}</p></td>
                                    <td ><p className='t_cont'>{mail.receiverName}</p></td>
                                    <td ><Button variant='secondary' onClick={() => {navigate('/student/editmail', { state: { senderId: senderId, senderName: senderName, mail_id: mail._id } }) }}><FontAwesomeIcon icon={faPenToSquare}/></Button></td>
                                    <td ><DeleteMailButton  mail_id={mail._id}/></td>
                                                                            
                                </tr>
                        </tbody>
                        ))
                ) : <h5  className='no_mail'>No pending applications found</h5>}
            </Table>
            </div>

            
         </div>  
        </div>
    );
}

export default PendingMail
