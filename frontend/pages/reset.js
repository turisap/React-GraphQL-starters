import Reset from '../components/ResetPassword';

const ResetPassword = props => (
    <div>
        <Reset resetToken={props.query.resetToken}/>
    </div>
);

export default ResetPassword;