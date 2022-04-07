
import Wrapper from "../assets/wrappers/StatsContainer"
import { useAppContext } from "../context/appContext"
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import React from "react"
import StatsItem from "./StatsItem"


const StatsContainer = () => {
  const {stats} = useAppContext()

  const defaultStats = [
    {
      title: 'staged',
      count: stats.staged || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'wip',
      count: stats.wip || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'completed',
      count: stats.completed || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },

    {
      title: 'on hold',
      count: stats.on_hold || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },

  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />
      })}
    </Wrapper>
  )

}
export default StatsContainer