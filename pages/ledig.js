import React from 'react';
import Image from 'next/image';

export async function getStaticProps() {
  const res = await fetch('https://reklameservice.no/wp-json/wp/v2/visningssteder/')
  const data = await res.json()

  const filteredData = data.filter((item) => {
    return item.acf.flater && item.acf.flater.some((flate) => {
      return flate.ledig === true
    })
  })

  const filteredIds = filteredData.map((item) => {
    return {
        id: item.id, 
        title: item.title.rendered, 
        felter: item.acf.flater.filter((flate) => flate.ledig === true).map((flate) => ({
            plassnr: flate.plassnr, 
            type: flate.type,
            format: flate.format,
            plassering: flate.plassering,

        }))}
  })

  return {
    props: {
      filteredIds,
    },
  }
}

function Page({ filteredIds }) {
  return (
    <>
      <div className='grid w-full justify-center h-full'>
        <div>
          <h1 className='text-xl uppercase text-center'>Ledige reklameflater</h1>
        </div>
      {filteredIds.map((item) => (
      <div key={item.id}>
         <h2 className="text-3xl font-bold text-center pb-4 pt-6">
            {item.title}
          </h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Plassnr
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Plassering
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Format
                      </th>
                  </tr>
              </thead>
              {item.felter && (
              <tbody>
                  {item.felter.map((felt) => (
                  <tr key={felt.plassnr} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="text-base font-semibold">
                            {felt.plassnr}
                          </div>
                      </th>
                      <td className="px-6 py-4">
                        {felt.plassering}
                      </td>
                      <td className="px-6 py-4">
                        {felt.type}
                      </td>
                      <td className="px-6 py-4">
                        {felt.format}
                      </td>
                  </tr>
                  ))}
              </tbody>
              )}
          </table>
        </div>
      </div>
      ))}
      </div>
    </>
  )
}

export default Page