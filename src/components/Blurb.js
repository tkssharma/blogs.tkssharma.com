import React from 'react'

import tkssharma from '../../content/images/profile.png'

export default function Blurb({ title, children }) {
  return (
    <section className="blurb">
      <div className="container">
        <div>
          <h1>{title}</h1>
          {children}
        </div>
        <div>
          <img src={tkssharma} alt="tkssharma" className="avatar" />
        </div>
      </div>
    </section>
  )
}
