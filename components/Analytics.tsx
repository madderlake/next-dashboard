'use client';
import Chart from '@/components/Chart';
import {
  BarList,
  BarChart,
  DonutChart,
  Legend,
  Card,
  Flex,
  Grid,
  Metric,
  Text,
  Title,
} from '@tremor/react';
import { SyntheticEvent, useState } from 'react';
const website = [
  { name: 'home', value: 1230 },
  { name: 'contact', value: 751 },
  { name: 'gallery', value: 471 },
  { name: 'aug-promo', value: 280 },
  { name: 'case-studies', value: 78 },
];

const shop = [
  { name: 'home', value: 453 },
  { name: 'imprint', value: 351 },
  { name: 'shop', value: 271 },
  { name: 'pricing', value: 191 },
];

const app = [
  { name: 'shop', value: 789 },
  { name: 'prod-features', value: 676 },
  { name: 'about', value: 564 },
  { name: 'login', value: 234 },
  { name: 'downloads', value: 191 },
];

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website,
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop,
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app,
  },
];

const dataCategories = data.map((item) => item.category);
// const dataCategories = Object.values(data.map((item) => item.data));

export default function Analytics() {
  const views = ['Donut', 'Bar List', 'Bar'];

  const [view, setView] = useState<string>('Donut');
  const [active, setActive] = useState<number>(0);

  const handleSelect = (e: SyntheticEvent, index: number) => {
    setView(e.currentTarget.innerHTML);
    setActive(index);
  };
  const numFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="p-4 mb-4 flex bg-slate-100">
        <ul className="flex justify-between w-1/4 text-tremor-default">
          {views.map((view, i) => (
            <li
              key={i}
              className={`cursor-pointer${
                active === i ? ' text-blue-600 font-bold ' : ''
              }`}
              onClick={(e) => handleSelect(e, i)}>
              {view}
            </li>
          ))}
        </ul>
      </div>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item, i) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2">
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
            </Flex>
            {view === 'Donut' && (
              <>
                <DonutChart
                  data={item.data}
                  valueFormatter={numFormatter}
                  className="mt-2"
                />
                <Legend
                  categories={Object.values(item.data.map((page) => page.name))}
                  colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
                  className="max-w-xs mt-6 justify-center"
                />
              </>
            )}
            {view === 'Bar List' && (
              <>
                <BarList
                  data={item.data}
                  valueFormatter={numFormatter}
                  className="mt-2"
                />
              </>
            )}
            {view === 'Bar' && (
              <>
                <BarChart
                  data={item.data}
                  valueFormatter={numFormatter}
                  index={'name'}
                  categories={['value']}
                  layout="vertical"
                  // categories={Object.values(item.data.map((page) => page.name))}
                />
              </>
            )}
          </Card>
        ))}
      </Grid>
      {/* <Chart /> */}
    </main>
  );
}
