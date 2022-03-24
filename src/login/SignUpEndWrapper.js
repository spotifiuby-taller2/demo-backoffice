import {SignUpEnd} from "./SignUpEnd";

// useNavigate is a hook, and hooks cannot be used
// in class components.
const SignUpEndWrapper = (props) => {
    return <SignUpEnd navigate={props.navigate} {...props} />
}

export default SignUpEndWrapper;
