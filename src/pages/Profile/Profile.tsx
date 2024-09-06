import { AccountCircle, Receipt, TaskAlt } from '@mui/icons-material'
import { useState } from 'react'
import { UserInfo } from '../../config/types/userTypes';
import { useAppSelector } from '../../store/hooks';
import { validateFullName, validateMail, validatePhone, validateRegistrationForm, validateUser } from '../../services/utilities/form-utility';
import DataPreview from '../../components/DataPreview/DataPreview';
import { dataPreviewType } from '../../config/types/commonTypes';
import './Profile.scss'

const initialUserInfo: UserInfo = {
    user: "admin",
    pwd: "",
    fullName: "shir hirsh",
    mail: "shirhirsh510@gmail.com",
    phone: "0503403413",
    credits: 830
};

const expenses: dataPreviewType = [
    {
        title: "שיר 1",
        total: 100,
        value: 23
    },
    {
        title: "שיר 2",
        total: 100,
        value: 78
    },
    {
        title: "שיר 3",
        total: 100,
        value: 92
    }
]

const categories = [
    {
        title: "אלעד",
        total: 100,
        value: 54
    },
    {
        title: "תמיד",
        total: 100,
        value: 54
    },
    {
        title: "מאחר",
        total: 100,
        value: 54
    },
    {
        title: "ואוהב",
        total: 100,
        value: 54
    },
    {
        title: "לשקר",
        total: 100,
        value: 30
    },
    {
        title: "שלא",
        total: 100,
        value: 70
    }
]

const Profile = () => {
    const uuid = useAppSelector(x => x.auth.uuid);
    const [profileInfo, setProfileInfo] = useState(initialUserInfo);

    const onUserChange = (e) => {
        const newVal = e.target.value;
        if (!validateUser(newVal)) return;

        setProfileInfo((x) => {
            const newCredentialsState = { ...x };
            newCredentialsState.user = newVal;
            return newCredentialsState;
        });
    };

    const onFullNameChange = (e) => {
        const newVal = e.target.value;
        if (!validateFullName(newVal)) return;

        setProfileInfo((x) => {
            const newCredentialsState = { ...x };
            newCredentialsState.fullName = newVal;
            return newCredentialsState;
        });
    };

    const onMailChange = (e) => {
        const newVal = e.target.value;
        if (!validateMail(newVal)) return;

        setProfileInfo((x) => {
            const newCredentialsState = { ...x };
            newCredentialsState.mail = newVal;
            return newCredentialsState;
        });
    };

    const onPhoneChange = (e) => {
        const newVal = e.target.value;
        const isNumeric = newVal.length === 0 || '0' <= newVal.slice(-1) && newVal.slice(-1) <= '9';
        if (!validatePhone(newVal) || !isNumeric) return;

        setProfileInfo((x) => {
            const newCredentialsState = { ...x };
            newCredentialsState.phone = newVal;
            return newCredentialsState;
        });
    };

    const saveChanges = async () => {
        const data = {
            uuid: uuid,
            ...profileInfo
        }
        if (!validateRegistrationForm(data, true)) return;

        // implement save profile changes

        return data;
    }
    return (
        <div className="profile">
            <div className='user-section'>
                <div className='user'>
                    <AccountCircle className='profile-icon' />
                    <div className="title">{profileInfo.user}</div>
                </div>
                <div className='credits'>
                    <div className='credit-count'>{profileInfo.credits}</div>
                    <div className='my-credits'>
                        <header>
                            💰
                            הקרדיטים שלי
                        </header>
                        <div className='description'>
                            ניתן לממש את הקרדיטים בעת רכישת גמדים/מוצרי גמדים
                        </div>
                    </div>
                </div>
            </div>
            <div className='information'>
                <div className='entry' id="fullName">
                    <input type="text" value={profileInfo.user} onChange={onUserChange} />
                    <header>שם משתמש</header>
                </div>
                <div className='entry' id="fullName">
                    <input type="text" value={profileInfo.fullName} onChange={onFullNameChange} />
                    <header>שם מלא</header>
                </div>
                <div className='entry' id="fullName">
                    <input type="text" value={profileInfo.mail} onChange={onMailChange} />
                    <header>כתובת מייל</header>
                </div>
                <div className='entry' id="fullName">
                    <input type="text" value={profileInfo.phone} onChange={onPhoneChange} />
                    <header>מספר טלפון</header>
                </div>
                <button className='edit-btn' onClick={saveChanges}>
                    <TaskAlt />
                    שמירה
                </button>
            </div>
            <DataPreview
                title='הוצאות'
                data={expenses}
                Icon={Receipt}
            />
            <DataPreview
                title='הקטגוריות המועדפות'
                data={categories} />
        </div>
    )
}
export default Profile