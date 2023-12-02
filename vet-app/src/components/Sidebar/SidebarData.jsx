import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as TfiIcons from "react-icons/tfi";


export const SidebarData = [
    {
        title: 'Kalendarz',
        path: '/calendar',
        icon: <BsIcons.BsFillCalendarWeekFill />,
        className: 'sidebar-text' 
    },
    {
        title: 'Pacjenci',
        path: '/patients',
        icon: <FaIcons.FaRegAddressBook />,
        className: 'sidebar-text' 
    },
    {
        title: 'Dodaj',
        path: '/add',
        icon: <BsIcons.BsFillBookmarkPlusFill />,
        className: 'sidebar-text' 
    },
    {
        title: 'Recepta',
        path: '/prescription',
        icon: <TfiIcons.TfiWrite />,
        className: 'sidebar-text' 
    }
]