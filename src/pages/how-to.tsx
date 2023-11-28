import Layout from "../components/layout";
import React, { ReactElement, useState, useEffect } from "react";

export default function HowTo() {
  return (
    <div>
      <div
        className={`bg-[url('/game-background-1.png')] bg-cover bg-no-repeat bg-left h-[260px] p-5 pl-[30px] border-b-[2px] border-[#CDCDCD]`}
      >
        <div className="flex w-full h-full justify-center items-center flex-col">
          <h1 className="text-[45px] font-semibold">How To Play</h1>
          <p className="text-[18px] text-center font-semibold pt-4">
        Welcome to the exciting world of stock trading! Our simulated stock
        trading game offers a realistic and educational experience in the world
        of finance and investments. Here’s how you can dive in.
      </p>
        </div>
      </div>
      <div className="pt-4 pb-4 bg-[#FAFAFA] h-auto">
        <HowToPlayAccordion />
      </div>
      <div className="bg-gray-900 p-6">
        <h2 className="text-lg md:text-xl font-semibold text-center mb-3 text-white">
          Ready to Make Your Mark?
        </h2>
        <p className="text-gray-400 text-sm md:text-base text-center mb-4">
          With TradeSaga, you&apos;re not just playing a game; you&apos;re building the
          foundation for financial literacy and smart investing. Set up your
          profile, start trading, and embark on a journey of learning and growth
          in the world of stock trading.
        </p>
      </div>
    </div>
  );
}

const AccordionItem = ({ title, children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="flex justify-between items-center w-full py-3 text-left text-lg font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

const HowToPlayAccordion = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">

      <AccordionItem title="Overview">
        <ul className="list-disc list-inside">
          <li>
            Our simulated stock trading platform is designed with simplicity and
            accessibility at its core, opening up the world of finance to a
            wider audience. Here, users can effortlessly join various trading
            games, each offering a unique and engaging way to learn about stock
            trading. Whether you&apos;re a beginner or have some experience, our
            platform provides a user-friendly environment to experiment with
            trading strategies, understand market dynamics, and build financial
            acumen.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="1. Navigating the Dashboard">
        <ul className="list-disc list-inside">
          <li>
            Stock Dashboard: This is where the action happens. View real-time
            data, track stock performance, and manage your trades.
          </li>
          <li>
            News Page: Stay informed with the latest financial news that could
            impact your trading decisions.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="2. Creating and Joining Games">
        <ul className="list-disc list-inside">
          <li>
            Create a Game: Set up a new game with your own rules and invite
            friends to join.
          </li>
          <li>
            Join Friends&apos; Games: Accept game invitations from friends and
            compete against them.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="3. How Games Work">
        <ul className="list-disc list-inside">
          <li>
            Structure: All players in a game recieve $100k virtual currency to
            freely trade. Games have a defined start and end date and players
            are free to trade as they please while the game is ongoing.
          </li>
          <li>
            Learning: TradeSaga is a platform to learn about financial markets.
            That&apos;s why we built simple to understand portfolio overview and
            analysis tools right into games.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="4. Buying and Selling Stocks">
        <ul className="list-disc list-inside">
          <li>
            Buying Stocks: Use your virtual capital to buy stocks. Choose from a
            wide range of companies. Analyze market trends and news to make
            informed decisions.
          </li>
          <li>
            Selling Stocks: Sell your stocks when you think it&apos;s the right time.
            Aim to sell them for a higher price than you bought them to make a
            profit.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="5. Making Trades">
        <ul className="list-disc list-inside">
          <li>
            Search for Stocks: Use the search bar to find stocks and view their
            performance history.
          </li>
          <li>
            Buy and Sell: When you&apos;re in a game, click the trade button to buy
            stocks. Navigate to your portfolio to sell.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="6. Portfolio Management">
        <ul className="list-disc list-inside">
          <li>
            Monitor Your Portfolio: Keep track of the stocks you own. Watch how
            their value changes over time.
          </li>
          <li>
            Diversify: Learn the importance of diversification by investing in
            different types of stocks.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="7. Compete and Learn">
        <ul className="list-disc list-inside">
          <li>
            Challenges and Competitions: Participate in trading challenges and
            compete with other players for the top spot on the leaderboard.
          </li>
          <li>
            Learning Resources: Access a wealth of educational resources to
            improve your trading strategies.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="8. Understand the Leaderboards">
        <ul className="list-disc list-inside">
          <li>
            Multiple Metrics: Leaderboards rank players not just on total
            percent return, but also on daily return and risk-to-reward ratio.
          </li>
          <li>
            Competitive Edge: Track your performance against others. Aim for the
            top in different categories to showcase your trading prowess.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="9. Stay Active in Your Game">
        <ul className="list-disc list-inside">
          <li>
            Portfolio Insights: Regularly check your portfolio. Adjust your
            strategy based on market movements and analysis.
          </li>
          <li>
            Updates and Posts: Share your trading strategies, achievements, and
            learnings within the game. Post updates and engage with other
            players’ strategies.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="10. Real-Time Market Simulation">
        <ul className="list-disc list-inside">
          <li>
            Market Simulation: Our game simulates real-time stock market
            conditions. Experience the thrill of trading just like in the real
            world.
          </li>
          <li>
            Risk-Free Environment: Experiment with different trading strategies
            without any real-world financial risk.
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem title="11. Progress and Rewards">
        <ul className="list-disc list-inside">
          <li>
            Achievements: Unlock achievements as you improve your trading
            skills.
          </li>
          <li>
            Rewards: Earn virtual rewards for your successful trades and top
            leaderboard positions.
          </li>
        </ul>
      </AccordionItem>
    </div>
  );
};

HowTo.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
