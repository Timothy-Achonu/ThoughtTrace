import React from 'react'
type DashboardLayoutPropsType = {
    children: React.ReactNode
}
function DashboardLayout({children}:DashboardLayoutPropsType) {
  return (
    <section className={`bg-primary-footer flex-1`}>
        {children}
    </section>
  )
}

export default DashboardLayout
