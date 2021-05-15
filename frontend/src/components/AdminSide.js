import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function AdminSide() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <div>
            <h1 className="font-weight-bold mb-5">Tap</h1>
            {
                userInfo && userInfo.isAdmin && (
                    <ul>
                        <li className="d-flex"><Link to="/dashboard"> <i class="far fa-clipboard mr-2"></i> dashboard</Link></li>
                        <li><Link to="/orderlist"> <i class="fas fa-shopping-bag mr-2"></i> orders</Link></li>
                        <li><Link to="/productlist"> <i class="fas fa-box mr-2"></i> products</Link></li>
                        <li><Link to="/userlist"> <i class="fas fa-user mr-2"></i> customers</Link></li>
                        <li><Link to="/support"> <i class="far fa-comment-alt mr-2"></i> supports</Link></li>
                        <li><Link to="/settings"> <i class="fas fa-sliders-h mr-2"></i> settings</Link></li>
                    </ul>
                )}
        </div>
    )
}
