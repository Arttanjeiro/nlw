
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import iconCheckImg from '../assets/icon.svg'
import logoImg from '../assets/logo.svg'
import appPreviewImg from '../assets/nlw-copa-preivew.png'
import userAvatares from '../assets/users-avatar-example.png'
import { api } from '../lib/axios'

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}
export default function Home(props: HomeProps) {
  const [poolTilte , setPoolTilte] = useState('')

  async function createPoll(event:FormEvent){
    event.preventDefault()
    try{
     const response = await api.post('/pools',{
        title: poolTilte,
      });

      const{code} = response.data
      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso , o código foi copiado para área de tranferênceia!')
      setPoolTilte('')
    }catch(err){
      alert('Falha ao criar o bolão , tenta novamente!')
    }

  }
   
  return (
   <div  className=' max-w-[1124px]  h-screen mx-auto grid grid-cols-2 gap-28 items-center tra'>
    <main>
      <Image src={logoImg} alt="Nlw copa"/>

      <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
        Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
      <div className='mt-10 flex items-center gap-2'>
       <Image src={userAvatares} alt=""/>
       <strong className='text-gray-100 text-xl'> 
        <span className='text-ignite-500'>+{props.userCount}</span> pessoas já estão usando
       
       </strong>
      </div>

      <form onSubmit={createPoll} className='mt-10 flex  gap-2'>
        <input
          className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100' 
          type="text" 
          required 
          placeholder='Qual nome do seu bolão?'
          onChange={event => setPoolTilte(event.target.value)}
          value={poolTilte}
        />
        <button
          className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700' 
          type="submit"
          >Criar um bolão 
        </button>
      </form>
      <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
        Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀

      </p>


      <div className='mt-10 pt-10 border-t border-gray-600  flex items-center justify-between text-gray-100'>
        <div className='flex items-center gap-6'>
          <Image src={iconCheckImg} alt=""/>
          <div className='flex flex-col'>
            <span  className='font-bold text-2xl'>+{props.poolCount}</span>
            <span>Bolões criados </span>
          </div>
        </div>
          <div className='w-px h-14 bg-gray-600'/>
        <div className='flex items-center gap-6'>
          <Image src={iconCheckImg} alt=""/>
          <div  className='flex flex-col'>
            <span className='font-bold text-2xl'>+{props.guessCount}</span>
            <span>Palpites enviados </span>
          </div>
        </div>
      </div>

    </main>
    <Image 
      src={appPreviewImg} 
      alt="Dois celulares exibindo uma prévia da aplicação móvel do nlw copa" 
      className='animate-bounce'
      quality={100}
    />
   </div>
  )
}


export async function getServerSideProps(){

  const [poolCountResponse , guessCountResponse , userCountResponse] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ])
 // console.log(poolCountResponse)

  return {
    props:{
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}


