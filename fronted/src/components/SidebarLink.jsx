import { Link } from "react-router-dom";

export const SidebarLink = ({Icon, text, link}) => {
    return (
        <Link to={link}>
            <div className="rounded-full text-xl p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer">
                {Icon}
                <span className="hidden md:inline lg:inline xl:inline ml-2">{text}</span>
            </div>
        </Link>
    )
}
