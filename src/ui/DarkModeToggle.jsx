import { useDarkMode } from "../context/DarkModeContext.jsx";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon.jsx";

function DarkModeToggle() {
    const { isDark, toggleDarkMode } = useDarkMode();

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDark ? <HiOutlineSun /> : <HiOutlineMoon /> }
        </ButtonIcon>
    );
}

export default DarkModeToggle;
