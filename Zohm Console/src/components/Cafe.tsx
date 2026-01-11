import { ChevronLeft, ChevronRight, Plus, Edit, Trash2, Clock, Users, DollarSign, ChefHat, Search, Filter, Star } from 'lucide-react';
import { useState } from 'react';

interface CafeProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function Cafe({ selectedProperty, onPropertyChange }: CafeProps) {
  return (
    <>
      <Header selectedProperty={selectedProperty} onPropertyChange={onPropertyChange} />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-8">
          <MealCalendar />
          <MenuPlanning />
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

function Header({ selectedProperty, onPropertyChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Cafe & Kitchen</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Plan and manage meals for your property</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Removed PropertyFilter - now in sidebar */}
        </div>
      </div>
    </header>
  );
}

interface Meal {
  id: string;
  name: string;
  servings: number;
  cost: number;
  prepTime: string;
  chef: string;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  recipe: string;
  ingredients: string[];
  prepTime: string;
  cost: number;
  servings: number;
  rating: number;
  status: 'active' | 'scheduled' | 'pending' | 'inactive';
  scheduledCount?: number;
  image: string;
  nutrition: {
    protein: string;
    carbs: string;
    fibre: string;
    fat: string;
    sugar: string;
  };
}

function MealCalendar() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()));
  const [selectedMealSlot, setSelectedMealSlot] = useState<{ day: string; slot: string } | null>(null);

  // Mock meal data
  const [meals, setMeals] = useState<Record<string, Record<string, Meal>>>({
    'Monday': {
      'breakfast': {
        id: '1',
        name: 'Avocado Toast & Fresh Juice',
        servings: 24,
        cost: 120,
        prepTime: '30 min',
        chef: 'Chef Maria'
      },
      'lunch': {
        id: '2',
        name: 'Mediterranean Bowl',
        servings: 32,
        cost: 180,
        prepTime: '45 min',
        chef: 'Chef Maria'
      }
    },
    'Tuesday': {
      'breakfast': {
        id: '3',
        name: 'Pancakes & Berries',
        servings: 28,
        cost: 140,
        prepTime: '40 min',
        chef: 'Chef John'
      },
      'dinner': {
        id: '4',
        name: 'Grilled Salmon & Vegetables',
        servings: 35,
        cost: 280,
        prepTime: '60 min',
        chef: 'Chef Maria'
      }
    },
    'Wednesday': {
      'lunch': {
        id: '5',
        name: 'Asian Fusion Stir-fry',
        servings: 30,
        cost: 165,
        prepTime: '35 min',
        chef: 'Chef John'
      }
    },
    'Thursday': {
      'breakfast': {
        id: '6',
        name: 'Smoothie Bowls',
        servings: 22,
        cost: 110,
        prepTime: '20 min',
        chef: 'Chef Maria'
      },
      'lunch': {
        id: '7',
        name: 'BBQ Pulled Pork Sandwiches',
        servings: 40,
        cost: 200,
        prepTime: '90 min',
        chef: 'Chef John'
      },
      'dinner': {
        id: '8',
        name: 'Pasta Primavera',
        servings: 38,
        cost: 190,
        prepTime: '40 min',
        chef: 'Chef Maria'
      }
    },
    'Friday': {
      'breakfast': {
        id: '9',
        name: 'Continental Breakfast',
        servings: 45,
        cost: 180,
        prepTime: '25 min',
        chef: 'Chef John'
      },
      'dinner': {
        id: '10',
        name: 'Taco Night',
        servings: 50,
        cost: 250,
        prepTime: '50 min',
        chef: 'Chef Maria'
      }
    }
  });

  const weekDays = getWeekDays(currentWeekStart);
  const mealSlots = [
    {
      id: 'breakfast',
      name: 'Breakfast',
      time: '7:00 AM - 10:00 AM',
      color: 'border-l-[#f0b100]'
    },
    {
      id: 'lunch',
      name: 'Lunch',
      time: '12:00 PM - 3:00 PM',
      color: 'border-l-[#9ae600]'
    },
    {
      id: 'dinner',
      name: 'Dinner',
      time: '6:00 PM - 9:00 PM',
      color: 'border-l-[#fb2c36]'
    }
  ];

  function getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
    return new Date(d.setDate(diff));
  }

  function getWeekDays(startDate: Date): { name: string; date: string; full: Date }[] {
    const days = [];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push({
        name: dayNames[i],
        date: `${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })}`,
        full: date
      });
    }
    return days;
  }

  function formatDateRange(startDate: Date): string {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'long' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'long' });
    const year = startDate.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startDay} - ${endDay} ${startMonth} ${year}`;
    } else {
      return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
    }
  }

  function previousWeek() {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newStart);
  }

  function nextWeek() {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newStart);
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl">Meal Calendar</h2>
          <p className="text-sm text-[#9f9fa9] mt-1">{formatDateRange(currentWeekStart)}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={previousWeek}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Week</span>
          </button>
          <button
            onClick={nextWeek}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors"
          >
            <span className="hidden sm:inline">Next Week</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#27272a]">
                <th className="text-left p-4 bg-[#09090b] w-48">
                  <div>
                    <div className="text-sm">Meal Slot</div>
                    <div className="text-xs text-[#71717b] mt-1">Time</div>
                  </div>
                </th>
                {weekDays.map((day, index) => (
                  <th key={index} className="text-left p-4 bg-[#09090b] border-l border-[#27272a]">
                    <div>
                      <div className="text-sm">{day.name}</div>
                      <div className="text-xs text-[#71717b] mt-1">{day.date}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mealSlots.map((slot) => (
                <tr key={slot.id} className="border-b border-[#27272a] last:border-0">
                  <td className={`p-4 bg-[#09090b] border-l-4 ${slot.color}`}>
                    <div>
                      <div className="text-sm">{slot.name}</div>
                      <div className="text-xs text-[#71717b] mt-1">{slot.time}</div>
                    </div>
                  </td>
                  {weekDays.map((day, dayIndex) => (
                    <td key={dayIndex} className="p-3 border-l border-[#27272a] align-top">
                      {meals[day.name]?.[slot.id] ? (
                        <MealCard
                          meal={meals[day.name][slot.id]}
                          onEdit={() => console.log('Edit meal')}
                          onDelete={() => {
                            const newMeals = { ...meals };
                            delete newMeals[day.name][slot.id];
                            setMeals(newMeals);
                          }}
                        />
                      ) : (
                        <button
                          onClick={() => setSelectedMealSlot({ day: day.name, slot: slot.id })}
                          className="w-full h-full min-h-[100px] border-2 border-dashed border-[#27272a] rounded-lg flex flex-col items-center justify-center gap-2 text-[#71717b] hover:border-[#9ae600] hover:bg-[#9ae600]/5 hover:text-[#9ae600] transition-all"
                        >
                          <Plus className="w-5 h-5" />
                          <span className="text-xs">Add Meal</span>
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface MealCardProps {
  meal: Meal;
  onEdit: () => void;
  onDelete: () => void;
}

function MealCard({ meal, onEdit, onDelete }: MealCardProps) {
  return (
    <div className="bg-[#27272a] border border-[#3a3a3a] rounded-lg p-3 hover:border-[#9ae600] transition-colors group">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm text-white leading-tight pr-2">{meal.name}</h4>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={onEdit}
            className="p-1 hover:bg-[#3a3a3a] rounded"
          >
            <Edit className="w-3 h-3 text-[#9f9fa9]" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-[#3a3a3a] rounded"
          >
            <Trash2 className="w-3 h-3 text-[#fb2c36]" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-[#9f9fa9]">
        <ChefHat className="w-3 h-3" />
        <span>{meal.chef}</span>
      </div>
    </div>
  );
}

function MenuPlanning() {
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock menu items data
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Avocado Toast & Fresh Juice',
      category: 'Breakfast',
      recipe: 'Toast the sourdough bread with avocado spread and serve with fresh orange juice and lemon.',
      ingredients: ['Avocado', 'Sourdough Bread', 'Orange Juice', 'Lemon'],
      prepTime: '30 min',
      cost: 120,
      servings: 24,
      rating: 4.8,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1623691752358-0be1e4235183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3QlMjBqdWljZXxlbnwxfHx8fDE3NjcyOTc2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '5g',
        carbs: '20g',
        fibre: '5g',
        fat: '10g',
        sugar: '15g'
      }
    },
    {
      id: '2',
      name: 'Mediterranean Bowl',
      category: 'Lunch',
      recipe: 'Combine quinoa, chickpeas, cucumber, feta cheese, and olives in a bowl.',
      ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Feta Cheese', 'Olives'],
      prepTime: '45 min',
      cost: 180,
      servings: 32,
      rating: 4.9,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1672959202028-51e3b71255bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYm93bCUyMGZvb2R8ZW58MXx8fHwxNzY3Mjk3NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '10g',
        carbs: '30g',
        fibre: '10g',
        fat: '5g',
        sugar: '5g'
      }
    },
    {
      id: '3',
      name: 'Pancakes & Berries',
      category: 'Breakfast',
      recipe: 'Mix flour, eggs, milk, and maple syrup to make pancakes. Serve with blueberries and strawberries.',
      ingredients: ['Flour', 'Eggs', 'Milk', 'Blueberries', 'Strawberries', 'Maple Syrup'],
      prepTime: '40 min',
      cost: 140,
      servings: 28,
      rating: 4.7,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1585407698236-7a78cdb68dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5jYWtlcyUyMGJlcnJpZXMlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzY3Mjk3NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '5g',
        carbs: '40g',
        fibre: '5g',
        fat: '10g',
        sugar: '20g'
      }
    },
    {
      id: '4',
      name: 'Grilled Salmon & Vegetables',
      category: 'Dinner',
      recipe: 'Grill salmon fillet with asparagus, bell peppers, lemon, and olive oil.',
      ingredients: ['Salmon Fillet', 'Asparagus', 'Bell Peppers', 'Lemon', 'Olive Oil'],
      prepTime: '60 min',
      cost: 280,
      servings: 35,
      rating: 4.9,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1633524792246-f25f5b0d66dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc2FsbW9uJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjcyOTc2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '30g',
        carbs: '5g',
        fibre: '5g',
        fat: '20g',
        sugar: '5g'
      }
    },
    {
      id: '5',
      name: 'Asian Fusion Stir-fry',
      category: 'Lunch',
      recipe: 'Stir-fry rice noodles with tofu, bok choy, ginger, and soy sauce.',
      ingredients: ['Rice Noodles', 'Tofu', 'Bok Choy', 'Ginger', 'Soy Sauce'],
      prepTime: '35 min',
      cost: 165,
      servings: 30,
      rating: 4.6,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1761314025701-34795be5f737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHN0aXIlMjBmcnl8ZW58MXx8fHwxNzY3MjUyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '15g',
        carbs: '30g',
        fibre: '5g',
        fat: '10g',
        sugar: '5g'
      }
    },
    {
      id: '6',
      name: 'Smoothie Bowls',
      category: 'Breakfast',
      recipe: 'Blend acai, banana, granola, coconut, and honey to make smoothie bowls.',
      ingredients: ['Acai', 'Banana', 'Granola', 'Coconut', 'Honey'],
      prepTime: '20 min',
      cost: 110,
      servings: 22,
      rating: 4.8,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1602234382521-610b2abf9029?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGJvd2wlMjBhY2FpfGVufDF8fHx8MTc2NzI5NzYyMXww&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '5g',
        carbs: '40g',
        fibre: '10g',
        fat: '10g',
        sugar: '20g'
      }
    },
    {
      id: '7',
      name: 'BBQ Pulled Pork Sandwiches',
      category: 'Lunch',
      recipe: 'Slow cook pork shoulder with BBQ sauce, serve with coleslaw and brioche buns.',
      ingredients: ['Pork Shoulder', 'BBQ Sauce', 'Coleslaw', 'Brioche Buns'],
      prepTime: '90 min',
      cost: 200,
      servings: 40,
      rating: 4.9,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1709581529998-11b7b2e17f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsZWQlMjBwb3JrJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzY3MjYwMjQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '20g',
        carbs: '20g',
        fibre: '5g',
        fat: '15g',
        sugar: '10g'
      }
    },
    {
      id: '8',
      name: 'Pasta Primavera',
      category: 'Dinner',
      recipe: 'Cook penne pasta with cherry tomatoes, zucchini, parmesan, and basil.',
      ingredients: ['Penne Pasta', 'Cherry Tomatoes', 'Zucchini', 'Parmesan', 'Basil'],
      prepTime: '40 min',
      cost: 190,
      servings: 38,
      rating: 4.7,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1712460845733-a48e8d4649c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHByaW1hdmVyYXxlbnwxfHx8fDE3NjcyOTc2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '10g',
        carbs: '40g',
        fibre: '5g',
        fat: '10g',
        sugar: '5g'
      }
    },
    {
      id: '9',
      name: 'Vegan Curry Bowl',
      category: 'Lunch',
      recipe: 'Cook coconut milk with sweet potato, chickpeas, spinach, and curry spices.',
      ingredients: ['Coconut Milk', 'Sweet Potato', 'Chickpeas', 'Spinach', 'Curry Spices'],
      prepTime: '50 min',
      cost: 155,
      servings: 30,
      rating: 4.6,
      status: 'scheduled',
      scheduledCount: 2,
      image: 'https://images.unsplash.com/photo-1679279726937-122c49626802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGN1cnJ5JTIwYm93bHxlbnwxfHx8fDE3NjcyOTc2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '10g',
        carbs: '30g',
        fibre: '10g',
        fat: '5g',
        sugar: '5g'
      }
    },
    {
      id: '10',
      name: 'Greek Yogurt Parfait',
      category: 'Breakfast',
      recipe: 'Layer Greek yogurt with granola, honey, and mixed berries.',
      ingredients: ['Greek Yogurt', 'Granola', 'Honey', 'Mixed Berries'],
      prepTime: '15 min',
      cost: 95,
      servings: 20,
      rating: 4.5,
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1571230389215-b34a89739ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMHlvZ3VydCUyMHBhcmZhaXR8ZW58MXx8fHwxNzY3Mjk3NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '5g',
        carbs: '30g',
        fibre: '5g',
        fat: '5g',
        sugar: '10g'
      }
    },
    {
      id: '11',
      name: 'Classic Burger & Fries',
      category: 'Lunch',
      recipe: 'Cook beef patty with lettuce, tomato, cheese, and serve with fries.',
      ingredients: ['Beef Patty', 'Lettuce', 'Tomato', 'Cheese', 'Fries'],
      prepTime: '45 min',
      cost: 220,
      servings: 35,
      rating: 4.4,
      status: 'inactive',
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmcmllc3xlbnwxfHx8fDE3NjcyNTMwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '20g',
        carbs: '20g',
        fibre: '5g',
        fat: '20g',
        sugar: '5g'
      }
    },
    {
      id: '12',
      name: 'Sushi Platter',
      category: 'Dinner',
      recipe: 'Roll sushi rice with salmon, tuna, avocado, nori, and soy sauce.',
      ingredients: ['Sushi Rice', 'Salmon', 'Tuna', 'Avocado', 'Nori', 'Soy Sauce'],
      prepTime: '75 min',
      cost: 320,
      servings: 25,
      rating: 4.8,
      status: 'inactive',
      image: 'https://images.unsplash.com/photo-1625937751876-4515cd8e78bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzY3Mjg5MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '20g',
        carbs: '30g',
        fibre: '5g',
        fat: '10g',
        sugar: '5g'
      }
    },
    {
      id: '13',
      name: 'Caesar Salad',
      category: 'Lunch',
      recipe: 'Combine romaine lettuce, croutons, parmesan, and caesar dressing.',
      ingredients: ['Romaine Lettuce', 'Croutons', 'Parmesan', 'Caesar Dressing'],
      prepTime: '25 min',
      cost: 130,
      servings: 28,
      rating: 4.5,
      status: 'inactive',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZHxlbnwxfHx8fDE3NjcyNDM4MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      nutrition: {
        protein: '5g',
        carbs: '20g',
        fibre: '5g',
        fat: '10g',
        sugar: '5g'
      }
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesTab = activeTab === 'all' ? true : item.status === 'scheduled';
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabCounts = {
    all: menuItems.length,
    scheduled: menuItems.filter(item => item.status === 'scheduled').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl">Menu Items</h2>
          <p className="text-sm text-[#9f9fa9] mt-1">Manage all menu items here</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Tabs and Search */}
      <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-[#27272a]">
          {/* Tabs */}
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'all'
                  ? 'border-[#9ae600] text-white'
                  : 'border-transparent text-[#9f9fa9] hover:text-white'
              }`}
            >
              All Items ({tabCounts.all})
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'scheduled'
                  ? 'border-[#9ae600] text-white'
                  : 'border-transparent text-[#9f9fa9] hover:text-white'
              }`}
            >
              Scheduled ({tabCounts.scheduled})
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-2 p-3 sm:p-0 sm:pr-4 border-t sm:border-t-0 border-[#27272a]">
            <div className="flex-1 sm:flex-initial relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-[#09090b] border border-[#27272a] rounded pl-10 pr-4 py-2 text-sm text-white placeholder-[#9f9fa9] focus:outline-none focus:border-[#9ae600]"
              />
            </div>
            <button className="p-2 bg-[#09090b] border border-[#27272a] rounded hover:bg-[#27272a] transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="p-4 sm:p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#9f9fa9]">No menu items found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
}

function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="bg-[#27272a] border border-[#3a3a3a] rounded-lg overflow-hidden hover:border-[#9ae600] transition-colors group">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 bg-[#27272a]/90 backdrop-blur-sm hover:bg-[#3a3a3a] rounded">
            <Edit className="w-3.5 h-3.5 text-[#9f9fa9]" />
          </button>
          <button className="p-1.5 bg-[#27272a]/90 backdrop-blur-sm hover:bg-[#3a3a3a] rounded">
            <Trash2 className="w-3.5 h-3.5 text-[#fb2c36]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header with Name */}
        <div className="mb-2">
          <h3 className="text-sm text-white">{item.name}</h3>
        </div>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block px-2 py-1 bg-[#9ae600]/10 text-[#9ae600] text-xs rounded">
            {item.category}
          </span>
        </div>

        {/* Recipe */}
        <div className="mb-3">
          <p className="text-xs text-[#9f9fa9] line-clamp-2">{item.recipe}</p>
        </div>

        {/* Ingredients */}
        <div className="mb-3">
          <p className="text-xs text-[#71717b] mb-1">Ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {item.ingredients.map((ingredient, index) => (
              <span key={index} className="px-2 py-0.5 bg-[#1a1a1a] text-[#9f9fa9] text-xs rounded">
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Nutrition Information */}
        <div className="mb-3 pb-3 border-b border-[#3a3a3a]">
          <div className="grid grid-cols-5 gap-2">
            <div className="text-center">
              <p className="text-xs text-[#71717b] mb-1">Protein</p>
              <p className="text-xs text-white">{item.nutrition.protein}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#71717b] mb-1">Carbs</p>
              <p className="text-xs text-white">{item.nutrition.carbs}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#71717b] mb-1">Fibre</p>
              <p className="text-xs text-white">{item.nutrition.fibre}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#71717b] mb-1">Fat</p>
              <p className="text-xs text-white">{item.nutrition.fat}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#71717b] mb-1">Sugar</p>
              <p className="text-xs text-white">{item.nutrition.sugar}</p>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="flex items-center gap-2 text-xs text-[#9f9fa9]">
          <DollarSign className="w-3.5 h-3.5" />
          <span>${item.cost}</span>
        </div>
      </div>
    </div>
  );
}