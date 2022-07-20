import Link from "next/link";
import logo from './logo.png';
import { useLunr } from 'react-lunr'
import { Formik, Form, Field } from 'formik'
import React, { useState } from 'react'

export default function Header() {
  console.log(logo);
  return (
    <nav>
      <h1>Saxo API Tutorials</h1>

      <style jsx>{`
        nav {
          background: #f7f7f7;
          width: auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
        }
        nav a {
          margin-right: 1rem;
          text-decoration: none;
        }
        nav a:hover {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
}