import { useState } from 'react';
import { UserInfo } from '../../../config/types/userTypes';
import './CreditsPopup.scss'
import { TaskAlt } from '@mui/icons-material';
import { useAppDispatch } from '../../../store/hooks';
import { closePopup } from '../../../store/slices/popupSlice';

const defaultUser: UserInfo =
{
    id: "1",
    credits: 200,
    fullName: "shiri",
    mail: "credits",
    phone: "3243243",
    user: "4353",
    pwd: "",
    role: "User",
}

const CreditsPopup = ({ user = defaultUser, callback }) => {
    const dispatch = useAppDispatch();
    const [amount, setAmount] = useState(10);
    const update = () => {
        callback(user, amount);
        dispatch(closePopup());
    }

    const onAmountChange = (e) => {
        const newVal = e.target.value;
        setAmount(newVal);
    }
    return (
        <div className="credits-popup">
            <header>:אנא הזן סכום להוספה</header>

            <input
                type="number"
                value={amount}
                onChange={onAmountChange} />
            <div className='warning'>
                בלחיצה על כפתור האישור, תוסיף {amount} קרדיטים למשתמש {user.user} ({user.fullName})
            </div>
            <button onClick={update}>
                <TaskAlt />
                הוספת קרדיטים
            </button>
        </div>
    )
}
export default CreditsPopup;