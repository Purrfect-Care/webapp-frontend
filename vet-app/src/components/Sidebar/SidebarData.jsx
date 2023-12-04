import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
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
        title: 'Wizyty',
        path: '/visit_type',
        icon: <BsIcons.BsFillBookmarkPlusFill />,
        className: 'sidebar-text' 
    },
    {
        title: 'Recepta',
        path: '/prescription',
        icon: <TfiIcons.TfiWrite />,
        className: 'sidebar-text' 
    },
    {
        title: 'Dodaj pacjenta',
        path: '/add-patient',
        icon: <TfiIcons.TfiIdBadge />,
        className: 'sidebar-text' 
    }
]