import Styles from "./TooSMallPage.module.css";

const TooSmallPage: React.FC = () => {

    return(<div className={Styles.Container}>
        <h1>Window too small</h1>
        <p>Expand the window or switch to a desktop</p>
    </div>)
};

export default TooSmallPage;