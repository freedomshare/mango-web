import { useEffect, useState } from 'react'
import BankCard from './BankCard'
import Button from './Button'
import Link from './Link'
//import GradientText from './GradientText'

const LendSection = () => {
  const [stats, setStats] = useState(null)
  const [prices, setPrices] = useState(null)

  useEffect(() => {
    const loadStats = async () => {
      const response = await fetch(
        'https://mango-stats.herokuapp.com/?mangoGroup=BTC_ETH_SOL_SRM_USDC'
      )
      setStats(await response.json())
    }
    loadStats()
  }, [])

  useEffect(() => {
    const loadPrices = async () => {
      const response = await fetch(
        `https://mango-transaction-log.herokuapp.com/stats/prices/2oogpTYm1sp6LPZAWD3bp2wsFpnV2kXL1s52yyFhW5vp`
      )
      const prices = await response.json()
      setPrices(prices)
    }
    loadPrices()
  }, [])

  const propsFor = (symbol) => {
    if (!stats || !prices)
      return {
        name: symbol,
        icon: `../token/icon-${symbol.toLowerCase()}.svg`,
        interest: { deposit: 0, borrow: 0 },
        liquidity: { native: 0, usd: 0 },
      }
    const filtered = stats.filter((s) => s.symbol == symbol)
    const lastStats = filtered[filtered.length - 1]
    const lastPrice = symbol === 'USDC' ? 1 : prices[symbol][lastStats.hourly]
    const native = lastStats.totalDeposits // - lastStats.totalBorrows
    return {
      name: symbol,
      icon: `../token/icon-${symbol.toLowerCase()}.svg`,
      interest: {
        deposit: lastStats.depositInterest * 100,
        borrow: lastStats.borrowInterest * 100,
      },
      liquidity: { native, usd: native * lastPrice },
    }
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4">
        <section className="py-12 px-3 lg:mt-60 md:mt-24 sm:mt-36 xs:mt-36">
          <div className="flex flex-wrap mx-auto justify-center items-center lg:text-center md:text-center sm:text-left">
            <div className="justify-center px-2 order-1 lg:order-none">
              <h2 className="mb-6 leading-tight font-semibold font-heading lg:text-5xl md:text-4xl sm:text-4xl xs:text-3xl">
                Never sell your crypto.
              </h2>
              <p className="mb-8 text-gray-400 leading-relaxed lg:text-2xl md:text-2xl sm:text-2xl xs:text-lg">
                Earn interest on deposits and take out fully collateralized
                loans against existing assets. The mango protocol&apos;s
                liquidity engine allows you to withdraw borrowed capital.
              </p>
              <div className="flex flex-row justify-center">
                <Button>Start lending</Button>
                <Link>Learn more</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full mx-auto px-4">
        <section className="px-3 mt-28">
          <div className="flex flex-col justify-center items-center text-center">
            {/* <div className="flex flex-col mb-8">
              <GradientText>
                <span className="text-2xl font-bold leading-relaxed">
                  Total Value Deposited
                </span>
              </GradientText>
              <div className="mt-4 inline-flex bg-th-fgd-4 shadow-md rounded-xl py-4 px-6 h-auto w-auto">
                <p className="px-2 text-3xl font-bold">$20,095,025.00</p>
              </div>
            </div> */}

            <div className="flex flex-col mb-12">
              {/* <GradientText>
                <span className="text-2xl font-bold leading-relaxed">
                  Liquidity Available
                </span>
              </GradientText> */}
              <div className="mt-4 flex flex-wrap text-left">
                <BankCard {...propsFor('USDC')} />
                <BankCard {...propsFor('BTC')} />
                <BankCard {...propsFor('ETH')} />
                <BankCard {...propsFor('SOL')} />
                <BankCard {...propsFor('SRM')} />
                 {/*
                <div className="flex-1 flex-col bg-th-fgd-4 shadow-md rounded-xl py-4 px-4 h-auto w-auto m-2 justify-center xl:hidden">
                  <p className="leading-tight font-extrabold font-heading text-5xl text-center">30+</p>
                  <p className="text-md text-white text-opacity-50 text-bold text-center">Assests Available</p>
                </div>
              */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <section className="px-3">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="">
              <div className="z-10 relative">
                <img
                  className="lg:h-750 lg:w-auto lg:max-w-none"
                  src="../img/borrow.png"
                  alt=""
                />
              </div>
            </div>
            {/*
            <div className="lg:col-span-6">
              <div className="z-10 relative -right-60 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full">
                <img
                  className="lg:h-750 lg:w-auto lg:max-w-none"
                  src="../img/borrow.png"
                  alt=""
                />
              </div>
            </div>
            */}

          </div>
        </section>
      </div>
    </div>
  )
}

export default LendSection
