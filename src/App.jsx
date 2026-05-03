import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Activity, Home, Dumbbell, HeartPulse, Flame, User, Calendar, 
  ChevronRight, AlertTriangle, CheckCircle2, XCircle, Info,
  Apple, Droplets, Target, Award, PlayCircle, Settings, ArrowLeft,
  Edit2, Save, Clock, Plus, Trash2, Youtube, CalendarPlus, TrendingUp,
  Menu, Bell, Sun, Moon, Maximize2, Minimize2, Check, Download, RefreshCw, Palette,
  BarChart2, Play, Pause, Square, Database, Share2, UploadCloud, Footprints, AlarmClock
} from 'lucide-react';

// Safelist for Tailwind JIT - Encompassing all dynamic theme classes safely
const SAFELIST = "text-emerald-500 bg-emerald-500 border-emerald-500 text-emerald-400 text-emerald-600 bg-emerald-50 bg-emerald-100 text-emerald-700 bg-emerald-200 border-emerald-200 border-emerald-400 border-emerald-800 bg-emerald-900/10 bg-emerald-900/30 bg-emerald-500/5 bg-emerald-500/10 bg-emerald-500/20 bg-emerald-500/30 border-emerald-500/20 shadow-emerald-500/20 shadow-emerald-500 text-rose-500 bg-rose-500 border-rose-500 text-rose-400 text-rose-600 bg-rose-50 bg-rose-100 text-rose-700 bg-rose-200 border-rose-200 border-rose-400 border-rose-800 bg-rose-900/10 bg-rose-900/30 bg-rose-500/5 bg-rose-500/10 bg-rose-500/20 bg-rose-500/30 border-rose-500/20 shadow-rose-500/20 shadow-rose-500 text-red-500 bg-red-500 border-red-500 text-red-400 text-red-600 bg-red-50 bg-red-100 text-red-700 bg-red-200 border-red-200 border-red-400 border-red-800 bg-red-900/10 bg-red-900/30 bg-red-500/5 bg-red-500/10 bg-red-500/20 bg-red-500/30 border-red-500/20 shadow-red-500/20 shadow-red-500 text-orange-500 bg-orange-500 border-orange-500 text-orange-400 text-orange-600 bg-orange-50 bg-orange-100 text-orange-700 bg-orange-200 border-orange-200 border-orange-400 border-orange-800 bg-orange-900/10 bg-orange-900/30 bg-orange-500/5 bg-orange-500/10 bg-orange-500/20 bg-orange-500/30 border-orange-500/20 shadow-orange-500/20 shadow-orange-500 text-blue-500 bg-blue-500 border-blue-500 text-blue-400 text-blue-600 bg-blue-50 bg-blue-100 text-blue-700 bg-blue-200 border-blue-200 border-blue-400 border-blue-800 bg-blue-900/10 bg-blue-900/30 bg-blue-500/5 bg-blue-500/10 bg-blue-500/20 bg-blue-500/30 border-blue-500/20 shadow-blue-500/20 shadow-blue-500 text-purple-500 bg-purple-500 border-purple-500 text-purple-400 text-purple-600 bg-purple-50 bg-purple-100 text-purple-700 bg-purple-200 border-purple-200 border-purple-400 border-purple-800 bg-purple-900/10 bg-purple-900/30 bg-purple-500/5 bg-purple-500/10 bg-purple-500/20 bg-purple-500/30 border-purple-500/20 shadow-purple-500/20 shadow-purple-500 text-cyan-500 bg-cyan-500 border-cyan-500 text-cyan-400 text-cyan-600 bg-cyan-50 bg-cyan-100 text-cyan-700 bg-cyan-200 border-cyan-200 border-cyan-400 border-cyan-800 bg-cyan-900/10 bg-cyan-900/30 bg-cyan-500/5 bg-cyan-500/10 bg-cyan-500/20 bg-cyan-500/30 border-cyan-500/20 shadow-cyan-500/20 shadow-cyan-500 text-yellow-500 bg-yellow-500 border-yellow-500 text-yellow-400 text-yellow-600 bg-yellow-50 bg-yellow-100 text-yellow-700 bg-yellow-200 border-yellow-200 border-yellow-400 border-yellow-800 bg-yellow-900/10 bg-yellow-900/30 bg-yellow-500/5 bg-yellow-500/10 bg-yellow-500/20 bg-yellow-500/30 border-yellow-500/20 shadow-yellow-500/20 shadow-yellow-500";

// --- DATABASE ---
const EXERCISE_DB = [
  { id: 1, name: 'Bodyweight Squats', category: 'Home workout', target: 'Legs, Glutes, Core', benefits: 'Builds lower body strength.', steps: ['Stand feet shoulder-width apart', 'Push hips back and bend knees', 'Push through heels to return'], dos: ['Keep back straight', 'Knees in line with toes'], donts: ['Let knees cave inward', 'Lift heels off floor'], type: 'strength', met: 5.0 },
  { id: 2, name: 'Walking Lunges', category: 'Home workout', target: 'Legs, Glutes', benefits: 'Improves balance and leg symmetry.', steps: ['Step forward with one leg', 'Lower hips until both knees are bent at 90 degrees', 'Push off back foot to step forward'], dos: ['Keep torso upright', 'Drop back knee close to floor'], donts: ['Let front knee go way past toes', 'Lean too far forward'], type: 'strength', met: 6.0 },
  { id: 3, name: 'Plank', category: 'Home workout', target: 'Core, Shoulders', benefits: 'Isometric core strength.', steps: ['Get into forearm push-up position', 'Engage core and glutes', 'Hold position'], dos: ['Keep elbows under shoulders', 'Keep a straight line from head to heels'], donts: ['Let hips drop', 'Pike hips to ceiling'], type: 'strength', met: 4.0 },
  { id: 4, name: 'Bicycle Crunches', category: 'Home workout', target: 'Core, Obliques', benefits: 'Targets side abdominals.', steps: ['Lie on back, hands behind head', 'Bring opposite elbow to opposite knee', 'Alternate sides in pedaling motion'], dos: ['Twist from the core', 'Keep lower back pressed to floor'], donts: ['Pull on your neck', 'Rush the movement'], type: 'strength', met: 5.0 },
  { id: 5, name: 'Push-ups', category: 'Home workout', target: 'Chest, Triceps, Delts', benefits: 'Enhances upper body pushing power.', steps: ['High plank position', 'Lower body until chest hovers above floor', 'Push back up'], dos: ['Straight line from head to heels'], donts: ['Flare elbows 90 degrees', 'Sag hips'], type: 'strength', met: 8.0 },
  { id: 6, name: 'Bench Press', category: 'Gym workout', target: 'Chest, Triceps, Delts', benefits: 'Massive upper body mass builder.', steps: ['Lie flat on bench', 'Lower bar to mid-chest', 'Press bar back up'], dos: ['Plant feet firmly', 'Retract shoulder blades'], donts: ['Bounce bar off chest', 'Lift hips off bench'], type: 'strength', met: 6.0 },
  { id: 7, name: 'Dumbbell Lateral Raises', category: 'Gym workout', target: 'Delts (Shoulders)', benefits: 'Widens shoulders.', steps: ['Hold dumbbells at sides', 'Raise arms out to sides until parallel with floor', 'Lower slowly'], dos: ['Slight bend in elbows', 'Control the descent'], donts: ['Use momentum to swing weights'], type: 'strength', met: 4.0 },
  { id: 8, name: 'Overhead Press', category: 'Gym workout', target: 'Shoulders, Triceps, Core', benefits: 'Builds vertical pushing strength.', steps: ['Hold barbell at shoulder level', 'Press weight directly overhead', 'Lower back to shoulders'], dos: ['Engage core', 'Keep wrists straight'], donts: ['Arch lower back excessively'], type: 'strength', met: 5.5 },
  { id: 9, name: 'Pull-ups', category: 'Gym workout', target: 'Back, Biceps', benefits: 'Ultimate back builder.', steps: ['Hang from bar with overhand grip', 'Pull body up until chin clears bar', 'Lower under control'], dos: ['Initiate with lats', 'Full range of motion'], donts: ['Kip or swing wildly', 'Half-rep'], type: 'strength', met: 8.0 },
  { id: 10, name: 'Barbell Deadlift', category: 'Gym workout', target: 'Back, Hamstrings, Glutes', benefits: 'Full body posterior chain strength.', steps: ['Mid-foot under bar', 'Bend knees, grab bar', 'Straighten back, lift chest', 'Pull'], dos: ['Bar close to shins', 'Drive through heels'], donts: ['Round lower back (cat back)', 'Jerk weight off floor'], type: 'strength', met: 6.0 },
  { id: 11, name: 'Dumbbell Bicep Curls', category: 'Gym workout', target: 'Biceps', benefits: 'Isolates and builds arm size.', steps: ['Hold dumbbells at sides, palms facing forward', 'Curl weights up to shoulder level', 'Lower slowly'], dos: ['Keep elbows pinned to sides', 'Full extension at bottom'], donts: ['Swing back to lift weight'], type: 'strength', met: 3.5 },
  { id: 12, name: 'Bent-Over Rows', category: 'Gym workout', target: 'Back, Biceps', benefits: 'Thickens the mid-back.', steps: ['Hinge at hips, back straight', 'Pull barbell to lower ribcage', 'Lower slowly'], dos: ['Squeeze shoulder blades together'], donts: ['Stand up too straight', 'Round lower back'], type: 'strength', met: 5.5 },
  { id: 13, name: 'Tricep Dips', category: 'Gym workout', target: 'Triceps, Chest', benefits: 'Builds pushing power and arm thickness.', steps: ['Support body on parallel bars', 'Lower body until elbows are at 90 degrees', 'Push back up'], dos: ['Keep torso slightly forward for chest, straight for triceps'], donts: ['Flare elbows way out', 'Dip too low (shoulder stress)'], type: 'strength', met: 5.0 },
  { id: 14, name: 'Interval Sprints', category: 'Aerobics', target: 'Cardio, Legs', benefits: 'Rapid calorie burning.', steps: ['Jog 5 mins', 'Sprint 90% effort for 30s', 'Walk 60s', 'Repeat 8x'], dos: ['Warm up thoroughly', 'Pump arms'], donts: ['Stop suddenly without walking', 'Overstride'], type: 'cardio', met: 10.0 },
  { id: 15, name: 'Jumping Jacks', category: 'Home workout', target: 'Cardio, Full Body', benefits: 'Great warmup and calorie burn.', steps: ['Jump spreading legs and raising arms', 'Jump back to start'], dos: ['Land softly on balls of feet'], donts: ['Lock knees upon landing'], type: 'cardio', met: 7.0 },
  { id: 16, name: 'Surya Namaskar', category: 'Yoga', target: 'Full Body, Flexibility', benefits: 'Improves mobility.', steps: ['Mountain Pose', 'Reach up', 'Fold forward', 'Step back', 'Downward dog'], dos: ['Sync breath with movement'], donts: ['Force stretch beyond comfort'], type: 'flexibility', met: 3.3 },
  { id: 17, name: 'Zumba Basics', category: 'Zumba', target: 'Cardio, Heart', benefits: 'Fun coordination.', steps: ['Side-to-side step', 'Arm swings', 'Merengue march', 'Follow beat'], dos: ['Keep knees bent slightly'], donts: ['Twist knees on carpet without lifting feet'], type: 'cardio', met: 6.5 }
];

const INITIAL_FOOD_DB = [
  { id: 101, name: 'Oatmeal & Berries', cals: 350, protein: 12, carbs: 60, fats: 6 },
  { id: 102, name: 'Eggs & Avocado Toast', cals: 450, protein: 20, carbs: 35, fats: 25 },
  { id: 103, name: 'Chicken Salad Bowl', cals: 400, protein: 45, carbs: 15, fats: 18 },
  { id: 104, name: 'Beef & Rice', cals: 650, protein: 50, carbs: 70, fats: 15 },
  { id: 105, name: 'Grilled Salmon & Veggies', cals: 500, protein: 40, carbs: 20, fats: 28 },
  { id: 106, name: 'Tofu Stir-fry', cals: 380, protein: 25, carbs: 40, fats: 15 },
  { id: 107, name: 'Protein Shake & Banana', cals: 250, protein: 25, carbs: 30, fats: 2 },
  { id: 108, name: 'Greek Yogurt & Nuts', cals: 300, protein: 20, carbs: 15, fats: 18 },
  { id: 109, name: 'Kangshoi (Veg Stew)', cals: 150, protein: 5, carbs: 20, fats: 2 },
  { id: 110, name: 'Nga Thongba (Fish Curry)', cals: 350, protein: 30, carbs: 10, fats: 15 },
  { id: 111, name: 'Yen Thongba (Chicken Curry)', cals: 400, protein: 35, carbs: 12, fats: 20 },
  { id: 112, name: 'Eromba', cals: 120, protein: 8, carbs: 15, fats: 2 },
  { id: 113, name: 'Singju', cals: 100, protein: 4, carbs: 15, fats: 3 },
  { id: 114, name: 'Chakhao (Black Rice)', cals: 200, protein: 5, carbs: 45, fats: 2 },
  { id: 115, name: 'Ooti (Peas/Dal)', cals: 250, protein: 12, carbs: 40, fats: 5 }
];

const DIET_DB = {
  'Weight loss': { behavior: 'Focus on volume eating to stay full. Limit simple carbs. Drink water before every meal to increase satiety.', eat: ['Leafy Greens', 'Lean Protein', 'Egg Whites', 'Berries'], avoid: ['Deep fried snacks', 'Excessive oil', 'Sugary sweets'] },
  'Muscle building': { behavior: 'Eat in a slight caloric surplus. Prioritize dense protein sources evenly throughout the day to recover muscle.', eat: ['Chicken', 'Fish', 'Beans', 'Rice', 'Whole Eggs'], avoid: ['Skipping meals', 'Excessive empty carbs without protein'] },
  'Weight gain': { behavior: 'Eat in a caloric surplus. Combine protein with dense carbs. Add healthy fats like nuts or olive oil to increase calories easily.', eat: ['Rice', 'Chicken', 'Whole milk', 'Nuts', 'Avocados'], avoid: ['Filling up entirely on low-cal clear soups before eating protein'] },
  'Menstrual Health': { behavior: 'Focus on iron-rich foods, magnesium, and hydration. Avoid excessive salt to reduce bloating.', eat: ['Spinach/Leafy Greens', 'Dark Chocolate', 'Salmon/Nga', 'Bananas'], avoid: ['Excessive caffeine', 'High sodium foods', 'Highly processed foods'] },
  'PCOS': { behavior: 'Focus on Low-GI carbohydrates and anti-inflammatory foods to balance hormones and insulin.', eat: ['Flaxseeds', 'Berries', 'Lentils/Ooti', 'Fatty Fish'], avoid: ['Sugary sweets', 'Refined white carbs', 'Dairy (if sensitive)'] }
};

const fullDays = { 'Mon': 'MONDAY', 'Tue': 'TUESDAY', 'Wed': 'WEDNESDAY', 'Thu': 'THURSDAY', 'Fri': 'FRIDAY', 'Sat': 'SATURDAY', 'Sun': 'SUNDAY' };

// --- ON-DEVICE AI LOGIC ---
const FitAI = {
  calculateBMI: (weight, heightCm) => (weight / Math.pow(heightCm / 100, 2)).toFixed(1),
  getBMICategory: (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal weight';
    if (bmi < 29.9) return 'Overweight';
    return 'Obese';
  },
  analyzeGoal: (profile) => {
    const bmi = FitAI.calculateBMI(profile.weight, profile.height);
    const category = FitAI.getBMICategory(bmi);
    let advice = ''; let isRealistic = true;
    
    const today = new Date();
    const targetDate = new Date(profile.targetDate);
    const weeksDiff = Math.max(1, (targetDate - today) / (1000 * 60 * 60 * 24 * 7));
    const weightDiff = Math.abs(profile.targetWeight - profile.weight);

    if (profile.goal === 'Weight loss') {
      const ratePerWeek = weightDiff / weeksDiff;
      if (ratePerWeek > 1) { advice = `Losing ${ratePerWeek.toFixed(1)}kg/week is aggressive. AI suggests 0.5kg - 0.8kg safely.`; isRealistic = false; } 
      else { advice = `Healthy deficit calculated! Lose ${ratePerWeek.toFixed(1)}kg per week safely.`; }
    } else {
      const ratePerWeek = weightDiff / weeksDiff;
      if (ratePerWeek > 0.5) { advice = `Gaining ${ratePerWeek.toFixed(1)}kg/week might result in fat. AI suggests a leaner bulk of 0.2kg - 0.4kg/week.`; isRealistic = false; } 
      else { advice = `Great timeline! Perfect pacing to build quality muscle tissue.`; }
    }
    return { bmi, category, advice, isRealistic, weeksDiff };
  },
  generatePlan: (goal, preferredWorkouts, dayTarget) => {
    let pool = EXERCISE_DB.filter(ex => preferredWorkouts.includes(ex.category));
    if (pool.length === 0) pool = EXERCISE_DB;
    pool = pool.sort(() => Math.random() - 0.5);

    let targetedPool = pool;
    if (dayTarget && !dayTarget.includes('Rest')) {
      const keywords = dayTarget.split(/ & | /).map(w => w.toLowerCase());
      const matches = pool.filter(ex => keywords.some(kw => ex.target.toLowerCase().includes(kw)));
      if (matches.length >= 3) targetedPool = matches; 
    }

    if (goal === 'Weight loss' && dayTarget.includes('Cardio')) targetedPool.sort((a, b) => (a.type === 'cardio' ? -1 : 1));
    else if (goal === 'Muscle building') targetedPool.sort((a, b) => (a.type === 'strength' ? -1 : 1));
    
    return targetedPool.slice(0, 5 + Math.floor(Math.random() * 2)); 
  },
  calculateTDEE: (gender, weight, height, age) => {
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = gender === 'Male' ? bmr + 5 : bmr - 161;
    return Math.round(bmr * 1.55);
  },
  calculateDiet: (profile) => {
    const tdee = FitAI.calculateTDEE(profile.gender, profile.weight, profile.height, profile.age);
    let targetCalories = tdee;
    let proteinSplit, carbSplit, fatSplit;

    if (profile.goal === 'Weight loss') { targetCalories -= 500; proteinSplit = 0.4; carbSplit = 0.3; fatSplit = 0.3; } 
    else if (profile.goal === 'Muscle building') { targetCalories += 300; proteinSplit = 0.3; carbSplit = 0.5; fatSplit = 0.2; } 
    else { targetCalories += 500; proteinSplit = 0.25; carbSplit = 0.5; fatSplit = 0.25; }

    return {
      calories: targetCalories,
      protein: Math.round((targetCalories * proteinSplit) / 4),
      carbs: Math.round((targetCalories * carbSplit) / 4),
      fats: Math.round((targetCalories * fatSplit) / 9),
    };
  },
  generateWeeklyPlan: (goal) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let plan = [];
    if (goal === 'Weight loss') plan = ['Full Body Cardio', 'Upper Body & Core', 'Lower Body & Cardio', 'Back & Biceps', 'Chest & Triceps', 'Active Rest', 'Rest'];
    else if (goal === 'Muscle building') plan = ['Chest & Triceps', 'Back & Biceps', 'Rest', 'Legs & Core', 'Shoulders & Delts', 'Full Body', 'Rest'];
    else plan = ['Heavy Legs', 'Heavy Chest', 'Rest', 'Hypertrophy Back', 'Hypertrophy Shoulders', 'Rest', 'Rest'];
    return days.map((day, i) => ({ day, target: plan[i] }));
  }
};

// --- APP COMPONENT ---
export default function App() {
  // 1. Core State
  const [theme, setTheme] = useState('dark');
  const [accent, setAccent] = useState('emerald'); 
  const [activeTab, setActiveTab] = useState('home'); 
  const [profile, setProfile] = useState(null);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // 2. UI & Interaction States
  const [menuOpen, setMenuOpen] = useState(false);
  const [widgetExpanded, setWidgetExpanded] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dietNotificationsEnabled, setDietNotificationsEnabled] = useState(true);
  const [waterNotificationsEnabled, setWaterNotificationsEnabled] = useState(true);
  const [showDietAlert, setShowDietAlert] = useState(false);
  const [showWaterAlert, setShowWaterAlert] = useState(false);
  
  // 3. Analytics States
  const [analyticsRange, setAnalyticsRange] = useState('Today');
  const [analyticsMetric, setAnalyticsMetric] = useState('Burned'); 
  const [analyticsDate, setAnalyticsDate] = useState(new Date().toISOString().split('T')[0]);
  
  // 4. Workout & Progress States
  const todayStr = new Date().toISOString().split('T')[0];
  const currentDayOfWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const [selectedDayIndex, setSelectedDayIndex] = useState(currentDayOfWeek);
  const [currentDayPlan, setCurrentDayPlan] = useState([]);
  const [workoutLogs, setWorkoutLogs] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [completedExercises, setCompletedExercises] = useState({ 0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[] }); 
  const [dailyBurnedCals, setDailyBurnedCals] = useState(0);
  
  // 5. Session States
  const [sessionPhase, setSessionPhase] = useState(null); 
  const [sessionQueue, setSessionQueue] = useState([]);

  // 6. Diet States
  const [foodDB, setFoodDB] = useState(INITIAL_FOOD_DB);
  const [dailyMeals, setDailyMeals] = useState([]);
  const [dietInput, setDietInput] = useState({ name: '', cals: '', protein: '', carbs: '', fats: '', time: '' });
  const [dietRecs, setDietRecs] = useState([]);
  const [showFoodSuggestions, setShowFoodSuggestions] = useState(false);
  const [saveToDB, setSaveToDB] = useState(false);
  
  const [showDBModal, setShowDBModal] = useState(false);
  const [showLogMealModal, setShowLogMealModal] = useState(false);
  const [showRecsModal, setShowRecsModal] = useState(false);
  
  // 7. Timer & Device States
  const [showTimerFullScreen, setShowTimerFullScreen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [exerciseLog, setExerciseLog] = useState({ sets: '', reps: '', weight: '' });
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [steps, setSteps] = useState(0);
  const [pedometerEnabled, setPedometerEnabled] = useState(false);
  const [history, setHistory] = useState({});
  const [completedDaysOfWeek, setCompletedDaysOfWeek] = useState([]);

  const [formData, setFormData] = useState({
    name: '', gender: 'Male', age: 25, weight: 70, height: 170,
    targetWeight: 65, targetDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0],
    goal: 'Weight loss', preferences: ['Home workout', 'Gym workout'], dietaryFocus: 'General', avatar: null
  });

  // --- MEMOS ---
  const tc = (str) => str.replace(/emerald/g, accent); 

  const dailyConsumed = useMemo(() => {
    return dailyMeals.reduce((acc, meal) => ({
      calories: acc.calories + meal.cals,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  }, [dailyMeals]);

  const stepCalories = useMemo(() => steps * 0.04 * ((profile?.weight || 70) / 70), [steps, profile]);
  const totalDailyBurned = dailyBurnedCals + stepCalories;

  const weeklyPlan = useMemo(() => {
    if (!profile) return [];
    return FitAI.generateWeeklyPlan(profile.goal);
  }, [profile]);

  const nutritionTargets = useMemo(() => {
    if (!profile) return { calories: 0, protein: 0, carbs: 0, fats: 0 };
    return FitAI.calculateDiet(profile);
  }, [profile]);

  const repBasedEstCals = useMemo(() => {
    if (!selectedExercise || !profile) return 0;
    const s = parseInt(exerciseLog.sets) || 0;
    const r = parseInt(exerciseLog.reps) || 0;
    const w = parseFloat(exerciseLog.weight) || 0;
    if (s === 0 || r === 0) return 0;
    const timeHrs = (s * r * 3) / 3600;
    const effectiveWeight = profile.weight + w;
    return selectedExercise.met * effectiveWeight * timeHrs;
  }, [exerciseLog.sets, exerciseLog.reps, exerciseLog.weight, selectedExercise, profile]);

  const currentCompletedList = completedExercises[selectedDayIndex] || [];
  const isAllWorkoutsDone = currentDayPlan.length > 0 && currentCompletedList.length === currentDayPlan.length;

  const sortedDayPlan = useMemo(() => {
    return [...currentDayPlan].sort((a, b) => {
      const aDone = currentCompletedList.includes(a.id);
      const bDone = currentCompletedList.includes(b.id);
      if (aDone && !bDone) return 1;
      if (!aDone && bDone) return -1;
      return 0;
    });
  }, [currentDayPlan, currentCompletedList]);

  // --- EFFECTS ---
  useEffect(() => {
    const savedProfile = localStorage.getItem('hbProfile');
    const savedLogs = localStorage.getItem('hbLogs');
    const savedTheme = localStorage.getItem('hbTheme');
    const savedAccent = localStorage.getItem('hbAccent');
    const savedDiet = localStorage.getItem('hbDietLog');
    const savedCompleted = localStorage.getItem('hbCompleted_' + todayStr); 
    const savedBurned = localStorage.getItem('hbBurned_' + todayStr);
    const savedFoodDB = localStorage.getItem('hbFoodDB');
    const savedSteps = localStorage.getItem('hbSteps_' + todayStr);
    const savedHistory = localStorage.getItem('hbHistory');
    const savedCompletedDays = localStorage.getItem('hbCompletedDaysOfWeek');
    
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedLogs) setWorkoutLogs(JSON.parse(savedLogs));
    if (savedTheme) setTheme(savedTheme);
    if (savedAccent) setAccent(savedAccent);
    if (savedDiet) setDailyMeals(JSON.parse(savedDiet)); 
    if (savedBurned) setDailyBurnedCals(parseFloat(savedBurned));
    if (savedFoodDB) setFoodDB(JSON.parse(savedFoodDB));
    if (savedSteps) setSteps(Number(savedSteps));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedCompletedDays) setCompletedDaysOfWeek(JSON.parse(savedCompletedDays));
    
    if (savedCompleted) {
      try {
        const parsed = JSON.parse(savedCompleted);
        if (Array.isArray(parsed)) {
          setCompletedExercises(prev => ({...prev, [selectedDayIndex]: parsed}));
        } else {
          setCompletedExercises(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (savedProfile) {
      if (dietNotificationsEnabled) {
        const dietTimer = setTimeout(() => setShowDietAlert(true), 5000);
        return () => clearTimeout(dietTimer);
      }
      if (waterNotificationsEnabled) {
        const waterTimer = setTimeout(() => setShowWaterAlert(true), 12000);
        return () => clearTimeout(waterTimer);
      }
    }
  }, [dietNotificationsEnabled, waterNotificationsEnabled, todayStr]);

  useEffect(() => {
    if (profile && weeklyPlan.length > 0) {
      const target = weeklyPlan[selectedDayIndex]?.target;
      if (target) setCurrentDayPlan(FitAI.generatePlan(profile.goal, profile.preferences, target));
    }
  }, [selectedDayIndex, profile, weeklyPlan]);

  useEffect(() => {
    if (foodDB.length > 0 && dietRecs.length === 0) {
      setDietRecs([...foodDB].sort(() => Math.random() - 0.5).slice(0, 4));
    }
  }, [foodDB, dietRecs.length]);

  useEffect(() => {
    if (!profile) return;
    setHistory(prev => {
      const currentHist = prev[todayStr] || { burned: 0, consumed: 0, steps: 0 };
      if (currentHist.burned === totalDailyBurned && currentHist.consumed === dailyConsumed.calories && currentHist.steps === steps) {
        return prev;
      }
      const newHist = { ...prev, [todayStr]: { burned: totalDailyBurned, consumed: dailyConsumed.calories, steps: steps } };
      localStorage.setItem('hbHistory', JSON.stringify(newHist));
      return newHist;
    });
  }, [totalDailyBurned, dailyConsumed.calories, steps, todayStr, profile]);

  useEffect(() => {
    localStorage.setItem('hbSteps_' + todayStr, steps.toString());
  }, [steps, todayStr]);

  useEffect(() => {
    if (isAllWorkoutsDone && !completedDaysOfWeek.includes(selectedDayIndex)) {
        const newDays = [...completedDaysOfWeek, selectedDayIndex];
        setCompletedDaysOfWeek(newDays);
        localStorage.setItem('hbCompletedDaysOfWeek', JSON.stringify(newDays));
    }
  }, [isAllWorkoutsDone, selectedDayIndex, completedDaysOfWeek]);

  useEffect(() => {
    let interval = null;
    if (timerActive && profile && selectedExercise) {
      interval = setInterval(() => {
        setTimerSeconds(t => {
          const newTime = t + 1;
          const extraWeight = parseFloat(exerciseLog.weight) || 0;
          const effectiveWeight = profile.weight + extraWeight;
          const cals = selectedExercise.met * effectiveWeight * (newTime / 3600);
          setCaloriesBurned(cals);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, profile, selectedExercise, exerciseLog.weight]);

  useEffect(() => {
    if (!pedometerEnabled) return;
    let lastUpdate = 0;
    const handleMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const mag = Math.sqrt(acc.x*acc.x + acc.y*acc.y + acc.z*acc.z);
      if (mag > 13) {
        const now = Date.now();
        if (now - lastUpdate > 300) { 
           setSteps(s => s + 1);
           lastUpdate = now;
        }
      }
    };
    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [pedometerEnabled]);


  // --- UTILITY HANDLERS ---
  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getDayName = () => ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][new Date().getDay()];

  const enablePedometer = () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(permissionState => {
        if (permissionState === 'granted') setPedometerEnabled(true);
      }).catch(console.error);
    } else {
      setPedometerEnabled(true); 
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('hbTheme', newTheme);
  };

  const changeAccent = (color) => {
    setAccent(color);
    localStorage.setItem('hbAccent', color);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({...formData, avatar: reader.result});
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    localStorage.setItem('hbProfile', JSON.stringify(formData));
    setProfile(formData);
    setActiveTab('home');
  };

  const saveLogs = (newLogs) => {
    localStorage.setItem('hbLogs', JSON.stringify(newLogs));
    setWorkoutLogs(newLogs);
  };

  const handleProfileUpdate = () => {
    saveProfile();
    setIsEditingProfile(false);
  };

  const addCaloriesBurned = (cals) => {
    const newTotal = dailyBurnedCals + cals;
    setDailyBurnedCals(newTotal);
    localStorage.setItem('hbBurned_' + todayStr, newTotal.toString());
  };

  const markExerciseCompleted = (id) => {
    setCompletedExercises(prev => {
      const currentDayCompleted = prev[selectedDayIndex] || [];
      if (!currentDayCompleted.includes(id)) {
        const newObj = { ...prev, [selectedDayIndex]: [...currentDayCompleted, id] };
        localStorage.setItem('hbCompleted_' + todayStr, JSON.stringify(newObj));
        return newObj;
      }
      return prev;
    });
  };

  const shareWorkout = () => {
    const shareText = `I just crushed my ${weeklyPlan[selectedDayIndex]?.target} workout on Health Bento Fitness! 💪🔥\n\n📊 Today's Stats:\n🔥 Burned: ${totalDailyBurned.toFixed(0)} kcal\n🍽️ Consumed: ${dailyConsumed.calories} kcal\n🚶 Steps: ${steps}\n\n[Check out my widget picture above!]`;
    if (navigator.share) {
      navigator.share({ title: 'Workout Complete!', text: shareText });
    } else {
      alert("Screenshot your widget and share it with friends!\n\n" + shareText);
    }
  };

  const removeExercise = (indexToRemove) => {
    setCurrentDayPlan(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const refreshDietRecs = () => {
    setDietRecs([...foodDB].sort(() => Math.random() - 0.5).slice(0, 4));
  };

  const handleDietInputChange = (e) => {
    const val = e.target.value;
    setDietInput({...dietInput, name: val});
    if (val.length > 1) setShowFoodSuggestions(true);
    else setShowFoodSuggestions(false);
  };

  const selectFoodSuggestion = (food) => {
    setDietInput({
      name: food.name, cals: food.cals.toString(), protein: food.protein.toString(),
      carbs: food.carbs.toString(), fats: food.fats.toString(), time: dietInput.time
    });
    setShowFoodSuggestions(false);
  };

  const handleLogMeal = () => {
    if (!dietInput.cals) return;
    
    let timeStr = dietInput.time;
    if (timeStr) {
       const [h, m] = timeStr.split(':');
       const dateObj = new Date();
       dateObj.setHours(parseInt(h), parseInt(m));
       timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
       timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const newMeal = {
      id: Date.now(), name: dietInput.name || 'Custom Meal',
      cals: parseFloat(dietInput.cals) || 0, protein: parseFloat(dietInput.protein) || 0,
      carbs: parseFloat(dietInput.carbs) || 0, fats: parseFloat(dietInput.fats) || 0,
      time: timeStr
    };
    
    const newLog = [...dailyMeals, newMeal];
    setDailyMeals(newLog);
    localStorage.setItem('hbDietLog', JSON.stringify(newLog));

    if (saveToDB) {
       const newDB = [...foodDB, { ...newMeal, id: Date.now() + 1 }];
       setFoodDB(newDB);
       localStorage.setItem('hbFoodDB', JSON.stringify(newDB));
    }

    setDietInput({ name: '', cals: '', protein: '', carbs: '', fats: '', time: '' });
    setSaveToDB(false);
    setShowLogMealModal(false);
  };

  const handleDeleteMeal = (id) => {
    const newLog = dailyMeals.filter(m => m.id !== id);
    setDailyMeals(newLog);
    localStorage.setItem('hbDietLog', JSON.stringify(newLog));
  };

  const handleDeleteFromDB = (id) => {
    const newDB = foodDB.filter(f => f.id !== id);
    setFoodDB(newDB);
    localStorage.setItem('hbFoodDB', JSON.stringify(newDB));
    setDietRecs([...newDB].sort(() => Math.random() - 0.5).slice(0, 4));
  };

  const prefillDietInput = (food) => {
    setDietInput({
      name: food.name, cals: food.cals.toString(), protein: food.protein.toString(),
      carbs: food.carbs.toString(), fats: food.fats.toString(), time: ''
    });
    setShowRecsModal(false);
    setShowLogMealModal(true);
  };

  const handlePrefToggle = (pref) => {
    setFormData(prev => {
      const prefs = prev.preferences.includes(pref) ? prev.preferences.filter(p => p !== pref) : [...prev.preferences, pref];
      return { ...prev, preferences: prefs };
    });
  };

  const exportData = () => {
    const data = {
      hbProfile: localStorage.getItem('hbProfile'),
      hbLogs: localStorage.getItem('hbLogs'),
      hbTheme: localStorage.getItem('hbTheme'),
      hbAccent: localStorage.getItem('hbAccent'),
      hbDietLog: localStorage.getItem('hbDietLog'),
      hbFoodDB: localStorage.getItem('hbFoodDB')
    };
    const blob = new Blob([JSON.stringify(data)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "health_bento_backup.json";
    a.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if(data.hbProfile) { localStorage.setItem('hbProfile', data.hbProfile); setProfile(JSON.parse(data.hbProfile)); }
        if(data.hbLogs) { localStorage.setItem('hbLogs', data.hbLogs); setWorkoutLogs(JSON.parse(data.hbLogs)); }
        if(data.hbTheme) { localStorage.setItem('hbTheme', data.hbTheme); setTheme(data.hbTheme); }
        if(data.hbAccent) { localStorage.setItem('hbAccent', data.hbAccent); setAccent(data.hbAccent); }
        if(data.hbDietLog) { localStorage.setItem('hbDietLog', data.hbDietLog); setDailyMeals(JSON.parse(data.hbDietLog)); }
        if(data.hbFoodDB) { localStorage.setItem('hbFoodDB', data.hbFoodDB); setFoodDB(JSON.parse(data.hbFoodDB)); }
        alert("Data restored successfully!");
      } catch (err) {
        alert("Invalid backup file.");
      }
    };
    reader.readAsText(file);
  };


  // --- RENDER HELPERS ---

  const getGoalAvatarStr = () => {
    if (!profile) return '🧍';
    const isMale = profile.gender === 'Male';
    if (profile.goal === 'Weight loss') return isMale ? '🏃‍♂️' : '🏃‍♀️';
    if (profile.goal === 'Muscle building') return isMale ? '🏋️‍♂️' : '🏋️‍♀️';
    return isMale ? '🧍‍♂️' : '🧍‍♀️';
  };

  const renderGoalAvatar = () => {
    let startPath, endPath;
    if (profile.goal === 'Weight loss') {
      startPath = "M8.5 7 h7 l2 8 l-2.5 7 h-2.5 l-0.5 -7 l-0.5 7 h-2.5 l-2.5 -7 Z"; 
      endPath = "M9 7 h6 l-1 7 l0.5 8 h-2 l-0.5 -8 l-0.5 8 h-2 l0.5 -8 Z"; 
    } else if (profile.goal === 'Muscle building') {
      startPath = "M9 7 h6 l-1 7 l0.5 8 h-2 l-0.5 -8 l-0.5 8 h-2 l0.5 -8 Z"; 
      endPath = "M7 7 h10 l-3 7 l0.5 8 h-2 l-0.5 -8 l-0.5 8 h-2 l0.5 -8 Z"; 
    } else {
      startPath = "M10 7 h4 l-0.5 7 l0.5 8 h-1.5 l-0.5 -8 l-0.5 8 h-1.5 l0.5 -8 Z"; 
      endPath = "M9 7 h6 l-1 7 l0.5 8 h-2 l-0.5 -8 l-0.5 8 h-2 l0.5 -8 Z"; 
    }

    const totalExercises = currentDayPlan.length;
    let progress = currentCompletedList.length / (totalExercises || 1);
    
    if (steps >= 4000) progress = Math.max(progress, 1);
    
    const isDanger = totalExercises > 0 && currentCompletedList.length === 0 && steps < 4000 && new Date().getHours() >= 18;

    return (
       <div className="relative w-16 h-16 flex items-center justify-center mx-auto mb-1">
          <svg viewBox="0 0 24 24" className={tc(`w-full h-full transition-colors duration-300 ${isDanger ? 'text-red-500' : 'text-emerald-500'}`)}>
             <circle cx="12" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
             <path d={startPath} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity={Math.max(0, 1 - progress)} className="transition-all duration-1000" />
             <path d={endPath} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity={Math.min(1, 0.2 + progress)} className="transition-all duration-1000" />
          </svg>
          {isDanger && (
             <div className="absolute -top-1 -right-1 bg-red-100 dark:bg-red-900/50 p-1 rounded-full animate-pulse">
                <AlertTriangle className="w-3 h-3 text-red-500" />
             </div>
          )}
          {progress >= 1 && totalExercises > 0 && (
             <div className={tc("absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-white dark:border-gray-900")}>
               <Check className="w-3 h-3 text-white" />
             </div>
          )}
       </div>
    );
  };

  const renderDashboardWidget = () => {
    const streakDays = [true, true, true, false, false, false, false, false]; 
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-6 relative transition-all flex h-full">
        <div className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 cursor-pointer p-1 z-10" onClick={() => setWidgetExpanded(!widgetExpanded)}>
          {widgetExpanded ? <Minimize2 className="w-4 h-4"/> : <Maximize2 className="w-4 h-4"/>}
        </div>
        
        <div className="flex-1 p-4 border-r border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" onClick={() => setActiveTab('home')}>
          <h2 className="text-xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">{getDayName()}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          
          <div className={`space-y-1 ${widgetExpanded ? '' : 'max-h-[50px] overflow-hidden relative'}`}>
            {sortedDayPlan.length > 0 ? sortedDayPlan.slice(0, widgetExpanded ? 6 : 2).map((ex, i) => {
              const isDone = currentCompletedList.includes(ex.id);
              return (
                <div key={i} className={`flex items-center text-xs px-2 py-1.5 rounded border truncate ${isDone ? tc('bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 line-through') : 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-100 dark:border-gray-700'}`}>
                  <div className={tc(`w-1.5 h-1.5 rounded-full mr-2 shrink-0 ${isDone ? 'bg-emerald-500' : 'bg-gray-400 dark:bg-gray-500'}`)}></div>
                  {ex.name}
                </div>
              );
            }) : <div className="text-xs text-gray-400 dark:text-gray-500">Rest Day</div>}
            {!widgetExpanded && sortedDayPlan.length > 2 && (
               <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
            )}
          </div>
        </div>
        
        <div className="w-32 py-4 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-950/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => setActiveTab('analytics')}>
           {renderGoalAvatar()}
           
           <div className="w-full flex flex-col items-center px-1 sm:px-2 text-[10px] sm:text-xs font-black mt-2 text-gray-700 dark:text-gray-300 gap-0.5">
             <div className="flex justify-between w-full px-1">
               <span className="text-orange-500 flex items-center"><Flame className="w-3 h-3 mr-0.5"/> {totalDailyBurned.toFixed(0)}</span>
               <span className="text-blue-500 flex items-center"><Apple className="w-3 h-3 mr-0.5"/> {dailyConsumed.calories}</span>
             </div>
             <span className={tc("text-emerald-500 flex items-center mt-1")}><Footprints className="w-3 h-3 mr-0.5"/> {steps} steps</span>
           </div>
        </div>
      </div>
    );
  };

  const renderTimerOverlay = () => {
    if (!showTimerFullScreen || !selectedExercise) return null;
    return (
      <div className={`fixed inset-0 z-[100] ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'} flex flex-col items-center justify-center animate-fade-in`}>
         <button onClick={() => setShowTimerFullScreen(false)} className="absolute top-6 left-6 p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"><ArrowLeft className="w-6 h-6"/></button>
         
         <h2 className="text-2xl font-bold mb-2 text-center px-4">{selectedExercise.name}</h2>
         <p className="text-sm text-gray-500 dark:text-gray-400 mb-12 flex items-center"><Target className="w-4 h-4 mr-1"/> {selectedExercise.target}</p>
         
         <div className={tc(`w-64 h-64 rounded-full border-8 border-emerald-500/20 flex items-center justify-center relative mb-12 shadow-[0_0_50px_rgba(0,0,0,0.1)] ${timerActive ? 'shadow-emerald-500/20' : ''}`)}>
            {timerActive && <div className={tc("absolute inset-0 rounded-full border-8 border-emerald-500 border-t-transparent animate-spin")} style={{animationDuration: '2s'}}></div>}
            <span className="text-6xl font-mono font-black">{formatTime(timerSeconds)}</span>
         </div>

         <div className="flex items-center gap-6 mb-12">
            {!timerActive ? (
              <button onClick={() => setTimerActive(true)} className={tc("w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform")}>
                 <Play className="w-8 h-8 ml-1" />
              </button>
            ) : (
              <button onClick={() => setTimerActive(false)} className="w-20 h-20 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                 <Pause className="w-8 h-8" />
              </button>
            )}
            <button onClick={() => { setTimerActive(false); setTimerSeconds(0); setCaloriesBurned(0); }} className="w-14 h-14 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:scale-105 transition-transform text-gray-700 dark:text-gray-300">
               <Square className="w-5 h-5" />
            </button>
         </div>

         <div className="flex flex-col items-center">
           <div className="flex items-center text-orange-500 font-bold text-xl">
             <Flame className="w-6 h-6 mr-2 animate-pulse"/>
             {caloriesBurned.toFixed(1)} kcal burned
           </div>
           <p className="text-xs text-gray-500 mt-2">(Calculated using MET value & {profile?.weight}kg bodyweight)</p>
         </div>
      </div>
    );
  };

  const renderOnboarding = () => (
    <div className={theme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans flex flex-col justify-center max-w-md mx-auto relative shadow-2xl overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800">
          <div className={tc("h-full bg-emerald-500 transition-all duration-300")} style={{ width: `${(onboardingStep / 4) * 100}%` }} />
        </div>
        <div className="p-8">
          <div className="flex items-center justify-center mb-8">
            <Activity className={tc("w-10 h-10 text-emerald-500 mr-2")} />
            <h1 className="text-2xl font-black tracking-tight">Health Bento<span className={tc("text-emerald-500")}> Fitness</span></h1>
          </div>
          {onboardingStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">Let's build your AI model.</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Your Name</label>
                  <input type="text" placeholder="e.g. Athlete" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={tc("w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none")} />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Gender</label>
                  <div className="flex gap-2">
                    {['Male', 'Female'].map(g => (
                      <button key={g} onClick={() => setFormData({...formData, gender: g})} className={tc(`flex-1 py-3 rounded-xl font-medium transition-colors border ${formData.gender === g ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'}`)}>{g}</button>
                    ))}
                  </div>
                </div>
                {formData.gender === 'Female' && (
                   <div>
                     <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Dietary Focus (Optional)</label>
                     <select value={formData.dietaryFocus} onChange={(e) => setFormData({...formData, dietaryFocus: e.target.value})} className={tc("w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none")}>
                       <option value="General">General</option>
                       <option value="Menstrual Health">Menstrual Health</option>
                       <option value="PCOS">PCOS Management</option>
                     </select>
                   </div>
                )}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Weight (kg)</label>
                    <input type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className={tc("w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none")} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Height (cm)</label>
                    <input type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} className={tc("w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none")} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Age</label>
                  <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className={tc("w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none")} />
                </div>
              </div>
              <button onClick={() => setOnboardingStep(2)} className={tc("w-full bg-emerald-500 text-white font-bold py-4 rounded-xl mt-8 flex items-center justify-center shadow-lg shadow-emerald-500/20")}>Next <ChevronRight className="ml-2 w-5 h-5" /></button>
            </div>
          )}
          {onboardingStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">What is your primary goal?</h2>
              <div className="space-y-3">
                {['Weight loss', 'Muscle building', 'Weight gain'].map(g => (
                  <button key={g} onClick={() => setFormData({...formData, goal: g})} className={tc(`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-between border ${formData.goal === g ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500 dark:text-emerald-400' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white'}`)}>
                    {g} {formData.goal === g && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <div className="flex-1">
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Target (kg)</label>
                  <input type="number" value={formData.targetWeight} onChange={(e) => setFormData({...formData, targetWeight: e.target.value})} className={tc("w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none")} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">By Date</label>
                  <input type="date" value={formData.targetDate} onChange={(e) => setFormData({...formData, targetDate: e.target.value})} className={tc("w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none")} />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setOnboardingStep(1)} className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl"><ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" /></button>
                <button onClick={() => setOnboardingStep(3)} className={tc("flex-1 bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20")}>Next <ChevronRight className="ml-2 w-5 h-5" /></button>
              </div>
            </div>
          )}
          {onboardingStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">How do you want to train?</h2>
              <div className="grid grid-cols-2 gap-3">
                {['Home workout', 'Gym workout', 'Aerobics', 'Zumba', 'Yoga'].map(pref => {
                  const isSelected = formData.preferences.includes(pref);
                  return (
                    <button key={pref} onClick={() => handlePrefToggle(pref)} className={tc(`py-4 px-4 rounded-xl font-medium text-left border flex flex-col items-start ${isSelected ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500 dark:text-emerald-400' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white'}`)}>
                      {pref}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setOnboardingStep(2)} className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl"><ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" /></button>
                <button onClick={() => setOnboardingStep(4)} className={tc("flex-1 bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20")}>Analyze Data</button>
              </div>
            </div>
          )}
          {onboardingStep === 4 && (() => {
            const analysis = FitAI.analyzeGoal(formData);
            return (
              <div className="space-y-6 animate-fade-in text-center">
                <div className={tc("w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4")}><Activity className={tc("w-10 h-10 text-emerald-500")} /></div>
                <h2 className="text-2xl font-bold">AI Analysis Complete</h2>
                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl space-y-4 border border-gray-200 dark:border-gray-800 text-left shadow-sm">
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
                    <span className="text-gray-500 dark:text-gray-400">Current BMI</span>
                    <span className="font-bold text-xl">{analysis.bmi}</span>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{analysis.advice}</p>
                  </div>
                </div>
                <button onClick={saveProfile} className={tc("w-full bg-emerald-500 text-white font-bold py-4 rounded-xl mt-8 shadow-lg shadow-emerald-500/20")}>Start Journey</button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="p-6 pb-24 space-y-6 animate-fade-in overflow-x-hidden">
      
      <div className="flex items-center gap-3 mt-4 mb-2">
        <div className={tc("w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-2xl shadow-sm overflow-hidden")}>
          {profile.avatar ? <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" /> : getGoalAvatarStr()}
        </div>
        <div>
           <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Today's Overview</p>
           <h1 className="text-xl font-black text-gray-900 dark:text-white">Hello, {profile.name || 'Athlete'}</h1>
        </div>
      </div>

      {renderDashboardWidget()}

      {/* Step Tracker */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 flex flex-col shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center">
                <div className={tc("w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mr-3")}>
                   <Footprints className={tc("w-5 h-5 text-emerald-500")} />
                </div>
                <div>
                   <p className="font-bold text-sm text-gray-900 dark:text-white flex items-center">
                     Daily Steps
                     {!pedometerEnabled && (
                       <button onClick={enablePedometer} className={tc("ml-2 text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full")}>Auto-Track</button>
                     )}
                   </p>
                   <p className="text-xs text-orange-500 font-medium">🔥 {stepCalories.toFixed(0)} kcal</p>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 w-full justify-between px-4">
              <button onClick={() => setSteps(Math.max(0, steps - 500))} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg shadow-sm text-gray-900 dark:text-white font-bold">-</button>
              <input type="number" value={steps} onChange={e => setSteps(Number(e.target.value) || 0)} className="flex-1 text-center bg-transparent font-black text-xl text-gray-900 dark:text-white outline-none" />
              <button onClick={() => setSteps(steps + 500)} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg shadow-sm text-gray-900 dark:text-white font-bold">+</button>
          </div>
      </div>

      {/* Accomplishment Banner */}
      {isAllWorkoutsDone && (
        <div className={tc("bg-emerald-500 text-white rounded-2xl p-5 shadow-lg shadow-emerald-500/20 flex flex-col items-center text-center animate-fade-in")}>
           <Award className="w-10 h-10 mb-2" />
           <h3 className="font-black text-lg">Workout Complete!</h3>
           <p className="text-sm opacity-90 mb-4">You've crushed all {currentDayPlan.length} exercises today.</p>
           <button onClick={shareWorkout} className={tc("flex items-center text-sm font-bold bg-white text-emerald-600 px-4 py-2 rounded-xl shadow hover:bg-emerald-50 transition-colors")}>
              <Share2 className="w-4 h-4 mr-2"/> Share Accomplishment
           </button>
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Weekly Blueprint</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x">
          {weeklyPlan.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            const isCompleted = completedDaysOfWeek.includes(idx);
            return (
              <div key={idx} onClick={() => setSelectedDayIndex(idx)} className={tc(`relative cursor-pointer snap-center shrink-0 w-24 p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${isSelected ? 'bg-emerald-500 border-emerald-400 text-white scale-105 shadow-lg shadow-emerald-500/20 z-10' : (isCompleted ? 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 text-gray-900 dark:text-white shadow-sm' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800')}`)}>
                {isCompleted && <CheckCircle2 className={tc(`absolute top-1.5 right-1.5 w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-500'}`)} />}
                <span className="text-xs font-bold mb-1">{day.day}</span>
                <span className={tc(`text-[10px] leading-tight font-medium ${isSelected ? 'text-emerald-50' : (isCompleted ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-400')}`)}>{day.target}</span>
              </div>
            );
          })}
        </div>
        <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Workout:+${weeklyPlan[selectedDayIndex]?.target}&details=Generated+by+Health+Bento+Fitness`} target="_blank" rel="noreferrer" className={tc("mt-3 inline-flex items-center text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/30 transition-colors font-bold w-full justify-center shadow-sm")}>
          <AlarmClock className="w-5 h-5 mr-2" /> Set Workout Alarm
        </a>
      </div>

      <div>
        <div className="flex justify-between items-end mb-4 mt-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">{fullDays[weeklyPlan[selectedDayIndex]?.day]}'S WORKOUT</h2>
          <div className="flex items-center gap-2">
            <span className={tc("text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20")}>{currentDayPlan.length} Exercises</span>
            <button onClick={() => setShowAddModal(true)} className={tc("p-1.5 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/30")}>
               <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          {sortedDayPlan.map((ex, idx) => {
            const isDone = currentCompletedList.includes(ex.id);
            return (
            <div key={idx} className={`bg-white dark:bg-gray-900 p-4 rounded-2xl flex items-center justify-between border border-gray-200 dark:border-gray-800 group transition-all duration-500 shadow-sm ${isDone ? tc('opacity-60 bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800') : ''}`}>
              <div className="flex items-center flex-1 cursor-pointer" onClick={() => setSelectedExercise(ex)}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shrink-0 transition-colors ${isDone ? tc('bg-emerald-500 text-white') : 'bg-gray-50 dark:bg-gray-800'}`}>
                  {isDone ? <CheckCircle2 className="w-6 h-6" /> : (
                    <>
                      {ex.category === 'Home workout' && <Home className={tc("w-6 h-6 text-emerald-500")} />}
                      {ex.category === 'Gym workout' && <Dumbbell className="w-6 h-6 text-blue-500" />}
                      {ex.category === 'Yoga' && <User className="w-6 h-6 text-purple-500" />}
                      {(ex.category === 'Aerobics' || ex.category === 'Zumba') && <HeartPulse className="w-6 h-6 text-red-500" />}
                    </>
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-sm sm:text-base transition-colors ${isDone ? tc('text-emerald-700 dark:text-emerald-400 line-through') : 'text-gray-900 dark:text-white'}`}>{ex.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Target className="w-3 h-3 mr-1 text-orange-400" /> {ex.target} 
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={(e) => { e.stopPropagation(); removeExercise(idx); }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-5 h-5" />
                </button>
                <PlayCircle onClick={(e) => { e.stopPropagation(); setSelectedExercise(ex); setShowTimerFullScreen(true); setTimerActive(true); }} className={tc(`w-6 h-6 shrink-0 cursor-pointer hover:opacity-100 ${isDone ? 'text-emerald-500 opacity-100' : 'text-emerald-500 opacity-50'}`)} />
              </div>
            </div>
            );
          })}
          {sortedDayPlan.length === 0 && (
             <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
               <p className="text-gray-500 dark:text-gray-400 text-sm">No exercises mapped. Rest or Add.</p>
               <button onClick={() => setShowAddModal(true)} className={tc("mt-3 text-emerald-500 text-sm font-bold flex items-center justify-center mx-auto")}>
                 <Plus className="w-4 h-4 mr-1" /> Browse Library
               </button>
             </div>
          )}
        </div>

        {/* Start Full Session Flow Button */}
        {!isAllWorkoutsDone && currentDayPlan.length > 0 && (
           <button onClick={() => {
              const uncompleted = sortedDayPlan.filter(ex => !currentCompletedList.includes(ex.id));
              setSessionQueue(uncompleted);
              setSessionPhase('warmup');
           }} className={tc("w-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold py-4 rounded-xl flex items-center justify-center hover:bg-emerald-500/20 transition-colors")}>
             Start Full Session
           </button>
        )}
      </div>
    </div>
  );

  const renderExerciseDetail = () => (
    <div className={theme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans flex flex-col max-w-md mx-auto relative shadow-2xl overflow-y-auto transition-colors duration-300">
        
        <div className="sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg p-4 z-10 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <button onClick={() => { setSelectedExercise(null); setTimerActive(false); setShowTimerFullScreen(false); setTimerSeconds(0); setCaloriesBurned(0); }} className="p-2 bg-gray-100 dark:bg-gray-900 rounded-full mr-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
            <span className="font-bold text-sm text-gray-900 dark:text-white">Details</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className={tc("inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-widest mb-3")}>
              {selectedExercise.category}
            </div>
            <h1 className="text-3xl font-black mb-2 text-gray-900 dark:text-white">{selectedExercise.name}</h1>
            <p className="text-sm text-blue-500 dark:text-blue-400 font-medium mb-3 flex items-center"><Target className="w-4 h-4 mr-1"/> Targets: {selectedExercise.target}</p>

            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedExercise.name + ' exercise form tutorial')}`} target="_blank" rel="noreferrer" className="flex items-center bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl border border-red-200 dark:border-red-500/20 transition-colors w-max">
              <Youtube className="w-5 h-5 mr-2" />
              <span className="text-sm font-bold">Watch Form on YouTube</span>
            </a>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm">
            <h3 className="text-gray-900 dark:text-white font-bold mb-4 flex items-center">
              <Activity className={tc("w-5 h-5 mr-2 text-emerald-500")} /> Form Guide
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
              {selectedExercise.steps?.map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={tc("flex items-center justify-center w-7 h-7 rounded-full border-2 border-emerald-500 bg-white dark:bg-gray-900 text-emerald-500 text-xs font-bold shrink-0 z-10")}>
                    {i + 1}
                  </div>
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
                      {step}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={tc("bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 p-4 rounded-2xl")}>
              <h3 className={tc("text-emerald-700 dark:text-emerald-400 font-bold mb-3 flex items-center text-sm")}>
                <CheckCircle2 className="w-4 h-4 mr-2" /> DOs
              </h3>
              <ul className="space-y-2">
                {selectedExercise.dos.map((item, i) => (
                  <li key={i} className="text-xs text-gray-700 dark:text-gray-300 flex items-start">
                    <span className={tc("text-emerald-500 mr-2")}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            {selectedExercise.donts && (
              <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 p-4 rounded-2xl">
                <h3 className="text-red-700 dark:text-red-400 font-bold mb-3 flex items-center text-sm">
                  <XCircle className="w-4 h-4 mr-2" /> DONTs
                </h3>
                <ul className="space-y-2">
                  {selectedExercise.donts.map((item, i) => (
                    <li key={i} className="text-xs text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-red-500 mr-2">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Progress Logger */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm">
            <h3 className="text-gray-900 dark:text-white font-bold mb-4 flex items-center">
              <TrendingUp className={tc("w-5 h-5 mr-2 text-emerald-500")} /> Log Progress
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Sets</label>
                <input type="number" placeholder="e.g. 3" value={exerciseLog.sets} onChange={e => setExerciseLog({...exerciseLog, sets: e.target.value})} className={tc("w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-center text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Reps</label>
                <input type="number" placeholder="e.g. 12" value={exerciseLog.reps} onChange={e => setExerciseLog({...exerciseLog, reps: e.target.value})} className={tc("w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-center text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Weight</label>
                <input type="number" placeholder="e.g. 20" value={exerciseLog.weight} onChange={e => setExerciseLog({...exerciseLog, weight: e.target.value})} className={tc("w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-center text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
              </div>
            </div>

            {/* Real-time calculated calories based on rep volume */}
            {repBasedEstCals > 0 && !showTimerFullScreen && (
              <div className="text-xs text-orange-500 font-bold bg-orange-50 dark:bg-orange-500/10 p-2 rounded flex items-center justify-center">
                <Flame className="w-4 h-4 mr-1"/> Est. Burn: {repBasedEstCals.toFixed(1)} kcal (adjusted for {profile.weight}kg)
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button onClick={() => { setShowTimerFullScreen(true); setTimerActive(true); }} className={tc("bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-bold py-4 rounded-xl flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors")}>
               <Clock className="w-5 h-5 mr-2"/> Run Timer
            </button>
            <button 
              onClick={() => {
                let calsToLog = caloriesBurned;
                if (calsToLog === 0 && repBasedEstCals > 0) calsToLog = repBasedEstCals;

                if (exerciseLog.weight || exerciseLog.reps) {
                   const currentPR = workoutLogs[selectedExercise.id]?.maxWeight || 0;
                   saveLogs({
                     ...workoutLogs,
                     [selectedExercise.id]: {
                       maxWeight: Math.max(currentPR, parseFloat(exerciseLog.weight) || 0), reps: exerciseLog.reps, sets: exerciseLog.sets, date: new Date().toISOString()
                     }
                   });
                }
                
                if (calsToLog > 0) addCaloriesBurned(calsToLog);
                markExerciseCompleted(selectedExercise.id);
                
                setSelectedExercise(null); setTimerActive(false); setShowTimerFullScreen(false); setTimerSeconds(0); setCaloriesBurned(0);
                setExerciseLog({ sets: '', reps: '', weight: '' });
              }} 
              className={tc("bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20")}>
              Save & Finish
            </button>
          </div>
        </div>

        {/* Full Screen Timer Overlay */}
        {renderTimerOverlay()}
      </div>
    </div>
  );

  const renderSessionFlow = () => (
    <div className={theme}>
      <div className="fixed inset-0 z-[110] bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col overflow-y-auto animate-fade-in">
         <div className="sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg p-4 z-10 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <button onClick={() => { setSessionPhase(null); setSessionQueue([]); setSelectedExercise(null); }} className="p-2 bg-gray-100 dark:bg-gray-900 rounded-full mr-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <XCircle className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
              <span className="font-bold text-sm text-gray-900 dark:text-white">Session Active</span>
            </div>
         </div>

         <div className="p-6 max-w-md mx-auto w-full space-y-6">
            <div>
              <div className={tc("inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-widest mb-3")}>
                Exercise {currentDayPlan.length - sessionQueue.length + 1} of {currentDayPlan.length}
              </div>
              <h1 className="text-3xl font-black mb-2 text-gray-900 dark:text-white">{selectedExercise.name}</h1>
              <p className="text-sm text-blue-500 dark:text-blue-400 font-medium mb-3 flex items-center"><Target className="w-4 h-4 mr-1"/> Targets: {selectedExercise.target}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm">
              <h3 className="text-gray-900 dark:text-white font-bold mb-4 flex items-center">
                <Activity className={tc("w-5 h-5 mr-2 text-emerald-500")} /> Form Guide
              </h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
                {selectedExercise.steps?.map((step, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={tc("flex items-center justify-center w-7 h-7 rounded-full border-2 border-emerald-500 bg-white dark:bg-gray-900 text-emerald-500 text-xs font-bold shrink-0 z-10")}>
                      {i + 1}
                    </div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
                        {step}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={tc("bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 p-4 rounded-2xl")}>
                <h3 className={tc("text-emerald-700 dark:text-emerald-400 font-bold mb-3 flex items-center text-sm")}>
                  <CheckCircle2 className="w-4 h-4 mr-2" /> DOs
                </h3>
                <ul className="space-y-2">
                  {selectedExercise.dos.map((item, i) => (
                    <li key={i} className="text-xs text-gray-700 dark:text-gray-300 flex items-start">
                      <span className={tc("text-emerald-500 mr-2")}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              {selectedExercise.donts && (
                <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 p-4 rounded-2xl">
                  <h3 className="text-red-700 dark:text-red-400 font-bold mb-3 flex items-center text-sm">
                    <XCircle className="w-4 h-4 mr-2" /> DONTs
                  </h3>
                  <ul className="space-y-2">
                    {selectedExercise.donts.map((item, i) => (
                      <li key={i} className="text-xs text-gray-700 dark:text-gray-300 flex items-start">
                        <span className="text-red-500 mr-2">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm">
              <h3 className="text-gray-900 dark:text-white font-bold mb-4 flex items-center">
                <TrendingUp className={tc("w-5 h-5 mr-2 text-emerald-500")} /> Log Progress
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Sets</label>
                  <input type="number" placeholder="e.g. 3" value={exerciseLog.sets} onChange={e => setExerciseLog({...exerciseLog, sets: e.target.value})} className={tc("w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-center text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Reps</label>
                  <input type="number" placeholder="e.g. 12" value={exerciseLog.reps} onChange={e => setExerciseLog({...exerciseLog, reps: e.target.value})} className={tc("w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-center text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Weight</label>
                  <input type="number" placeholder="e.g. 20" value={exerciseLog.weight} onChange={e => setExerciseLog({...exerciseLog, weight: e.target.value})} className={tc("w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-center text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
                </div>
              </div>
              {repBasedEstCals > 0 && !showTimerFullScreen && (
                <div className="text-xs text-orange-500 font-bold bg-orange-50 dark:bg-orange-500/10 p-2 rounded flex items-center justify-center">
                  <Flame className="w-4 h-4 mr-1"/> Est. Burn: {repBasedEstCals.toFixed(1)} kcal
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <button onClick={() => { setShowTimerFullScreen(true); setTimerActive(true); }} className={tc("bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-bold py-4 rounded-xl flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors")}>
                 <Clock className="w-5 h-5 mr-2"/> Timer
              </button>
              <button 
                onClick={() => {
                  let calsToLog = caloriesBurned;
                  if (calsToLog === 0 && repBasedEstCals > 0) calsToLog = repBasedEstCals;

                  if (exerciseLog.weight || exerciseLog.reps) {
                     const currentPR = workoutLogs[selectedExercise.id]?.maxWeight || 0;
                     saveLogs({
                       ...workoutLogs,
                       [selectedExercise.id]: {
                         maxWeight: Math.max(currentPR, parseFloat(exerciseLog.weight) || 0), reps: exerciseLog.reps, sets: exerciseLog.sets, date: new Date().toISOString()
                       }
                     });
                  }
                  
                  if (calsToLog > 0) addCaloriesBurned(calsToLog);
                  markExerciseCompleted(selectedExercise.id);
                  
                  const newQueue = sessionQueue.slice(1);
                  setSessionQueue(newQueue);
                  if (newQueue.length > 0) {
                      setSelectedExercise(newQueue[0]);
                  } else {
                      setSelectedExercise(null);
                      setSessionPhase('cooldown');
                  }
                  
                  setTimerActive(false); setShowTimerFullScreen(false); setTimerSeconds(0); setCaloriesBurned(0);
                  setExerciseLog({ sets: '', reps: '', weight: '' });
                }} 
                className={tc("bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center")}>
                Save & Next <ChevronRight className="w-5 h-5 ml-1"/>
              </button>
            </div>
         </div>
         
         {renderTimerOverlay()}
      </div>
    </div>
  );

  const renderDiet = () => {
    let behaviorText = DIET_DB[profile.goal]?.behavior || '';
    if (profile.gender === 'Female' && profile.dietaryFocus && DIET_DB[profile.dietaryFocus]) {
       behaviorText += " " + DIET_DB[profile.dietaryFocus].behavior;
    }

    return (
      <div className="p-6 pb-24 space-y-6 animate-fade-in">
        <header className="flex justify-between items-end">
          <div>
            <p className={tc("text-emerald-500 text-sm font-bold tracking-wider uppercase")}>Nutrition Engine</p>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Calorie Counter</h1>
          </div>
          <button onClick={() => setShowDBModal(true)} className={tc("text-xs text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full")}>Manage DB</button>
        </header>

        {/* Target vs Consumed */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="text-center mb-6 flex justify-around items-end">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 uppercase font-bold tracking-wider">Target</p>
              <h2 className="text-2xl font-black text-gray-400 dark:text-gray-500">{nutritionTargets.calories}</h2>
            </div>
            <div>
              <p className={tc("text-emerald-500 text-xs mb-1 uppercase font-bold tracking-wider")}>Consumed</p>
              <h2 className={tc("text-4xl font-black text-emerald-500")}>{dailyConsumed.calories}</h2>
            </div>
          </div>
          
          {/* Macros */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Protein</p>
              <p className="font-bold text-blue-500 text-sm">{dailyConsumed.protein}g / <span className="text-xs text-gray-400">{nutritionTargets.protein}g</span></p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Carbs</p>
              <p className="font-bold text-amber-500 text-sm">{dailyConsumed.carbs}g / <span className="text-xs text-gray-400">{nutritionTargets.carbs}g</span></p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fats</p>
              <p className="font-bold text-red-500 text-sm">{dailyConsumed.fats}g / <span className="text-xs text-gray-400">{nutritionTargets.fats}g</span></p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">Nutritional goals adjusted for your bodyweight ({profile.weight} kg).</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
           <button onClick={() => setShowLogMealModal(true)} className={tc("flex flex-col items-center justify-center p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors")}>
             <Plus className="w-6 h-6 mb-2"/>
             <span className="text-xs font-bold">Log Meal</span>
           </button>
           <button onClick={() => setShowRecsModal(true)} className={tc("flex flex-col items-center justify-center p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors")}>
             <Apple className="w-6 h-6 mb-2"/>
             <span className="text-xs font-bold">Diet Ideas</span>
           </button>
           <button onClick={() => setShowDBModal(true)} className={tc("flex flex-col items-center justify-center p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors")}>
             <Database className="w-6 h-6 mb-2"/>
             <span className="text-xs font-bold">Database</span>
           </button>
        </div>

        {/* Today's Logged Meals */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm mt-6">
           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Today's Log</h3>
           {dailyMeals.length > 0 ? (
             <div className="space-y-3">
               {dailyMeals.map(meal => (
                 <div key={meal.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                   <div>
                       <p className="font-bold text-sm text-gray-900 dark:text-white flex items-center">
                         {meal.name}
                       </p>
                       <p className="text-xs text-gray-500 dark:text-gray-400">
                         <Clock className="w-3 h-3 inline mr-1 opacity-70"/>{meal.time || 'Logged today'} 
                         <span className="mx-2">|</span> 
                         P:{meal.protein}g C:{meal.carbs}g F:{meal.fats}g
                       </p>
                   </div>
                   <div className="flex items-center gap-4">
                       <span className={tc("text-emerald-600 dark:text-emerald-400 font-bold text-sm")}>{meal.cals} kcal</span>
                       <button onClick={() => handleDeleteMeal(meal.id)} className="p-1 hover:bg-red-100 dark:hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4 text-red-500" /></button>
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
               <p className="text-gray-500 dark:text-gray-400 text-sm">No meals logged yet.</p>
             </div>
           )}
        </div>

        {/* Modal: Log Meal */}
        {showLogMealModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex flex-col items-center justify-end md:justify-center">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-t-3xl md:rounded-3xl shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center"><Edit2 className={tc("w-5 h-5 mr-2 text-emerald-500")}/> Log a Meal</h3>
                <button onClick={() => setShowLogMealModal(false)}><XCircle className="w-6 h-6 text-gray-500 dark:text-gray-400"/></button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 relative">
                <div className="col-span-2 relative">
                   <input type="text" placeholder="Meal Name (Start typing...)" value={dietInput.name} onChange={handleDietInputChange} onFocus={() => dietInput.name.length > 1 && setShowFoodSuggestions(true)} onBlur={() => setTimeout(() => setShowFoodSuggestions(false), 200)} className={tc("w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
                   {showFoodSuggestions && (
                     <div className="absolute bottom-full mb-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-40 overflow-y-auto">
                       {foodDB.filter(f => f.name.toLowerCase().includes(dietInput.name.toLowerCase())).map((food, i) => (
                         <div key={i} onClick={() => selectFoodSuggestion(food)} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0 flex justify-between items-center text-sm">
                           <span className="text-gray-900 dark:text-white">{food.name}</span>
                           <span className={tc("text-xs text-emerald-500 font-bold")}>{food.cals} kcal</span>
                         </div>
                       ))}
                     </div>
                   )}
                </div>
                <input type="number" placeholder="Calories" value={dietInput.cals} onChange={e => setDietInput({...dietInput, cals: e.target.value})} className={tc("bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
                <input type="time" value={dietInput.time} onChange={e => setDietInput({...dietInput, time: e.target.value})} className={tc("bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
                <input type="number" placeholder="Protein (g)" value={dietInput.protein} onChange={e => setDietInput({...dietInput, protein: e.target.value})} className={tc("bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
                <input type="number" placeholder="Carbs (g)" value={dietInput.carbs} onChange={e => setDietInput({...dietInput, carbs: e.target.value})} className={tc("bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
                <input type="number" placeholder="Fats (g)" value={dietInput.fats} onChange={e => setDietInput({...dietInput, fats: e.target.value})} className={tc("col-span-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500")} />
              </div>
              <div className="flex items-center mb-4 ml-1">
                 <input type="checkbox" id="saveDb" checked={saveToDB} onChange={(e) => setSaveToDB(e.target.checked)} className={tc("mr-2 accent-emerald-500 rounded")} />
                 <label htmlFor="saveDb" className="text-xs text-gray-500 dark:text-gray-400">Save to Database for future</label>
              </div>
              <button onClick={handleLogMeal} className={tc("w-full bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/20")}>
                Add to Daily Log
              </button>
            </div>
          </div>
        )}

        {/* Modal: Recommendations */}
        {showRecsModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex flex-col items-center justify-end md:justify-center">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-t-3xl md:rounded-3xl max-h-[80vh] overflow-y-auto shadow-2xl">
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center">
                   <Apple className={tc("w-6 h-6 text-emerald-500 mr-2")} />
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white">Diet Ideas</h3>
                 </div>
                 <div className="flex gap-2">
                   <button onClick={refreshDietRecs} className={tc("text-emerald-500 p-1 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-full transition-colors")}><RefreshCw className="w-5 h-5" /></button>
                   <button onClick={() => setShowRecsModal(false)}><XCircle className="w-6 h-6 text-gray-500 dark:text-gray-400"/></button>
                 </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{behaviorText}</p>
              
              <div className="space-y-3">
                {dietRecs.map((food, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 group transition-all relative overflow-hidden">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-sm text-gray-900 dark:text-white">{food.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">P:{food.protein}g | C:{food.carbs}g | F:{food.fats}g</p>
                      </div>
                      <span className={tc("text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded")}>{food.cals} kcal</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => prefillDietInput(food)} className="flex-1 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold py-1.5 rounded flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-500/20 transition-colors">
                        <Edit2 className="w-3 h-3 mr-1" /> Log
                      </button>
                      <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(food.name + ' recipe healthy')}`} target="_blank" rel="noreferrer" className="flex-1 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold py-1.5 rounded flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors">
                        <Youtube className="w-3 h-3 mr-1" /> Recipe
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal: Database Management */}
        {showDBModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex flex-col items-center justify-end md:justify-center">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-t-3xl md:rounded-3xl max-h-[80vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center"><Database className={tc("w-5 h-5 mr-2 text-emerald-500")}/> Food Database</h3>
                <button onClick={() => setShowDBModal(false)}><XCircle className="w-6 h-6 text-gray-500 dark:text-gray-400"/></button>
              </div>
              <div className="space-y-2">
                {foodDB.map((food, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-white truncate max-w-[180px]">{food.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">P:{food.protein} C:{food.carbs} F:{food.fats}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={tc("text-emerald-500 font-bold text-xs")}>{food.cals} kcal</span>
                      <button onClick={() => handleDeleteFromDB(food.id)} className="p-1 hover:bg-red-100 dark:hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </div>
                  </div>
                ))}
                {foodDB.length === 0 && <p className="text-center text-sm text-gray-500 py-4">Database is empty.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAnalytics = () => {
    let chartLabels = [];
    let chartData = [];
    
    // Setup Custom Dates / Past Data Generation
    const getPastDays = (num) => {
      return Array.from({length: num}, (_, i) => {
        const d = new Date(analyticsDate);
        d.setDate(d.getDate() - (num - 1 - i));
        return d.toISOString().split('T')[0];
      });
    };

    if (analyticsRange === 'Today') {
       chartLabels = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
       chartData = [0, 0, 0, 0, 0, 0];
       
       if (analyticsDate === todayStr) {
           if (analyticsMetric === 'Consumed') {
               dailyMeals.forEach(m => {
                   const h = new Date(m.id).getHours();
                   if (h < 9) chartData[0] += m.cals;
                   else if (h < 12) chartData[1] += m.cals;
                   else if (h < 15) chartData[2] += m.cals;
                   else if (h < 18) chartData[3] += m.cals;
                   else if (h < 21) chartData[4] += m.cals;
                   else chartData[5] += m.cals;
               });
           } else if (analyticsMetric === 'Steps') {
               const hourlySteps = steps / 6;
               chartData = chartData.map(v => v + hourlySteps);
           } else {
               const stepPerBucket = stepCalories / 6;
               chartData = chartData.map(v => v + stepPerBucket);
               chartData[2] += (dailyBurnedCals * 0.3); // Randomly spread workout burns to make chart look active
               chartData[4] += (dailyBurnedCals * 0.7);
           }
       } else {
           const histDay = history[analyticsDate];
           if (histDay) {
               const total = analyticsMetric === 'Consumed' ? histDay.consumed : (analyticsMetric === 'Steps' ? histDay.steps : histDay.burned);
               chartData = [total*0.1, total*0.2, total*0.3, total*0.1, total*0.2, total*0.1];
           }
       }
    } else if (analyticsRange === 'This Month') {
       const past30 = getPastDays(30);
       chartLabels = past30.map(d => {
           return new Date(d).getDate();
       }); 
       chartData = past30.map(d => history[d]?.[analyticsMetric === 'Consumed' ? 'consumed' : (analyticsMetric === 'Steps' ? 'steps' : 'burned')] || 0);
    } else {
       const past7 = getPastDays(7);
       chartLabels = past7.map(d => new Date(d).toLocaleDateString('en-US', {weekday: 'short'}));
       chartData = past7.map(d => history[d]?.[analyticsMetric === 'Consumed' ? 'consumed' : (analyticsMetric === 'Steps' ? 'steps' : 'burned')] || 0); 
    }

    const maxVal = Math.max(...chartData, 1);
    const isMonthly = analyticsRange === 'This Month';
    
    const getBarColor = () => {
       if (analyticsMetric === 'Burned') return 'bg-orange-500';
       if (analyticsMetric === 'Consumed') return 'bg-blue-500';
       return tc('bg-emerald-500');
    }

    const toggleMetric = () => {
       if (analyticsMetric === 'Burned') setAnalyticsMetric('Consumed');
       else if (analyticsMetric === 'Consumed') setAnalyticsMetric('Steps');
       else setAnalyticsMetric('Burned');
    };

    return (
      <div className="p-6 pb-24 space-y-6 animate-fade-in">
         <header className="flex justify-between items-end mb-4">
          <div>
            <p className={tc("text-emerald-500 text-sm font-bold tracking-wider uppercase")}>Overview</p>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Data Analytics</h1>
          </div>
        </header>

        {/* Custom History Lookup */}
        <div className="flex items-center gap-2 mb-2 bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
           <Calendar className="w-5 h-5 text-gray-400" />
           <input type="date" value={analyticsDate} onChange={(e) => setAnalyticsDate(e.target.value)} className="bg-transparent font-bold text-gray-900 dark:text-white outline-none flex-1" />
           {analyticsDate !== todayStr && (
             <button onClick={() => setAnalyticsDate(todayStr)} className={tc("text-xs text-emerald-500 font-bold px-2")}>Today</button>
           )}
        </div>

        {/* Timeframe Toggles */}
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
          {['Today', 'This Week', 'This Month'].map(range => (
            <button 
              key={range} 
              onClick={() => setAnalyticsRange(range)} 
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${analyticsRange === range ? tc('bg-white dark:bg-gray-700 shadow text-emerald-500') : 'text-gray-500 dark:text-gray-400'}`}>
              {range}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Volume History</h3>
              {/* Y-Axis Metric Toggle */}
              <button onClick={toggleMetric} className={tc("flex items-center text-xs font-bold bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700")}>
                <RefreshCw className="w-3 h-3 mr-1" /> View {analyticsMetric === 'Burned' ? 'Consumed' : (analyticsMetric === 'Consumed' ? 'Steps' : 'Burned')}
              </button>
           </div>
           
           <div className={`flex items-end h-48 border-b border-gray-100 dark:border-gray-800 pb-2 ${isMonthly ? 'gap-1 overflow-x-auto custom-scrollbar snap-x justify-start' : 'gap-2 justify-between'}`}>
              {chartData.map((val, i) => {
                const heightPercent = maxVal === 0 ? 0 : (val / maxVal) * 100;
                return (
                <div key={i} className={`flex flex-col items-center group h-full justify-end ${isMonthly ? 'min-w-[12px] snap-center' : 'flex-1'}`}>
                   <span className={`text-[8px] text-gray-900 dark:text-gray-300 font-bold mb-1 transition-opacity ${isMonthly ? 'opacity-0 group-hover:opacity-100' : ''}`}>
                     {val > 0 ? val.toFixed(0) : ''}
                   </span>
                   <div className="w-full relative bg-gray-50 dark:bg-gray-800 rounded-t-sm flex items-end overflow-hidden" style={{height: `${Math.max(heightPercent, 5)}%`}}>
                      <div className={`w-full rounded-t-sm transition-all duration-1000 opacity-80 group-hover:opacity-100 ${getBarColor()}`} style={{height: `100%`}}></div>
                   </div>
                   <span className="text-[8px] text-gray-500 dark:text-gray-400 mt-2 font-bold whitespace-nowrap">
                     {isMonthly ? (i % 5 === 0 ? chartLabels[i] : ' ') : chartLabels[i]}
                   </span>
                </div>
              )})}
           </div>
           <p className="text-xs text-gray-500 mt-4 text-center">Graphing {analyticsMetric.toLowerCase()} data for selected timeframe.</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1 flex items-center justify-center"><Flame className="w-3 h-3 mr-1 text-orange-500"/> Burned</p>
            <h2 className="text-lg font-black text-gray-900 dark:text-white leading-tight">{analyticsDate === todayStr ? totalDailyBurned.toFixed(0) : (history[analyticsDate]?.burned || 0)}</h2>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1 flex items-center justify-center"><Apple className="w-3 h-3 mr-1 text-blue-500"/> Consumed</p>
            <h2 className="text-lg font-black text-gray-900 dark:text-white leading-tight">{analyticsDate === todayStr ? dailyConsumed.calories : (history[analyticsDate]?.consumed || 0)}</h2>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1 flex items-center justify-center"><Footprints className={tc("w-3 h-3 mr-1 text-emerald-500")}/> Steps</p>
            <h2 className="text-lg font-black text-gray-900 dark:text-white leading-tight">{analyticsDate === todayStr ? steps : (history[analyticsDate]?.steps || 0)}</h2>
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => (
    <div className="p-6 pb-24 space-y-6 animate-fade-in">
       <header className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-wider uppercase">Configuration</p>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Settings</h1>
        </div>
        <button onClick={() => setIsEditingProfile(!isEditingProfile)} className={tc("p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-emerald-500")}>
          {isEditingProfile ? <Save className="w-5 h-5" onClick={handleProfileUpdate} /> : <Edit2 className="w-5 h-5" />}
        </button>
      </header>

      <div className="flex flex-col items-center mb-6">
        <div className={tc("w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800")}>
          {formData.avatar ? <img src={formData.avatar} className="w-full h-full object-cover" alt="Avatar"/> : <User className="w-8 h-8 text-gray-400" />}
        </div>
        {isEditingProfile && (
          <label className={tc("text-xs font-bold text-emerald-500 mt-2 cursor-pointer border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 rounded-full")}>
            Upload Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        )}
      </div>

      {/* App Preferences */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 space-y-4 border border-gray-200 dark:border-gray-800 shadow-sm">
         <h3 className="font-bold text-gray-900 dark:text-white mb-2">App Preferences</h3>
         
         <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Theme (Light / Dark)</span>
            <button onClick={toggleTheme} className={tc("p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-emerald-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors")}>
              {theme === 'dark' ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5"/>}
            </button>
         </div>

         <div className="flex justify-between items-start border-b border-gray-100 dark:border-gray-800 pb-4">
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium flex items-center mt-1"><Palette className="w-4 h-4 mr-2"/> Accent Color</span>
            <div className="flex flex-wrap gap-2 justify-end max-w-[140px]">
              {[
                { name: 'emerald', hex: 'bg-emerald-500' }, { name: 'rose', hex: 'bg-rose-500' },
                { name: 'red', hex: 'bg-red-500' }, { name: 'orange', hex: 'bg-orange-500' },
                { name: 'blue', hex: 'bg-blue-500' }, { name: 'purple', hex: 'bg-purple-500' },
                { name: 'cyan', hex: 'bg-cyan-500' }, { name: 'yellow', hex: 'bg-yellow-500' }
              ].map(color => (
                <button key={color.name} onClick={() => changeAccent(color.name)} className={`w-6 h-6 rounded-full ${color.hex} border-2 ${accent === color.name ? 'border-gray-900 dark:border-white scale-110 shadow-lg' : 'border-transparent'}`} />
              ))}
            </div>
         </div>

         <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Data Backup & Restore</span>
            <div className="flex gap-2">
              <button onClick={exportData} className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-colors"><Download className="w-4 h-4"/></button>
              <label className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-500/30 transition-colors cursor-pointer">
                 <UploadCloud className="w-4 h-4"/>
                 <input type="file" accept=".json" onChange={importData} className="hidden" />
              </label>
            </div>
         </div>

         <div className="flex justify-between items-center pb-2">
            <div className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Install to Homescreen</span>
              <span className="text-[10px] text-gray-400">Creates app icon & widget access</span>
            </div>
            <button onClick={() => alert("To install: Tap your browser's menu (⋮ or Share icon) and select 'Add to Home Screen'.")} className={tc("p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors")}>
              <Download className="w-5 h-5"/>
            </button>
         </div>
      </div>

      {/* Profile Data */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 space-y-4 border border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Body Metrics</h3>
        {isEditingProfile ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={tc("w-full bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm border border-gray-200 dark:border-gray-700 outline-none focus:ring-1 focus:ring-emerald-500")} />
            </div>
            {formData.gender === 'Female' && (
               <div>
                 <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Dietary Focus</label>
                 <select value={formData.dietaryFocus} onChange={(e) => setFormData({...formData, dietaryFocus: e.target.value})} className={tc("w-full bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm border border-gray-200 dark:border-gray-700 outline-none focus:ring-1 focus:ring-emerald-500")}>
                   <option value="General">General</option>
                   <option value="Menstrual Health">Menstrual Health</option>
                   <option value="PCOS">PCOS Management</option>
                 </select>
               </div>
            )}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">Weight (kg)</label>
                <input type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className={tc("w-full bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm border border-gray-200 dark:border-gray-700 outline-none focus:ring-1 focus:ring-emerald-500")} />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">Target (kg)</label>
                <input type="number" value={formData.targetWeight} onChange={(e) => setFormData({...formData, targetWeight: e.target.value})} className={tc("w-full bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm border border-gray-200 dark:border-gray-700 outline-none focus:ring-1 focus:ring-emerald-500")} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
              <span className="text-gray-500 dark:text-gray-400">Name</span>
              <span className="font-bold text-gray-900 dark:text-white">{profile.name || 'Athlete'}</span>
            </div>
            {profile.gender === 'Female' && profile.dietaryFocus !== 'General' && (
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
                <span className="text-gray-500 dark:text-gray-400">Diet Focus</span>
                <span className={tc("font-bold text-emerald-500")}>{profile.dietaryFocus}</span>
              </div>
            )}
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
              <span className="text-gray-500 dark:text-gray-400">Weight</span>
              <span className="font-bold text-gray-900 dark:text-white">{profile.weight} kg</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-500 dark:text-gray-400">Target</span>
              <span className="font-bold text-gray-900 dark:text-white">{profile.targetWeight} kg</span>
            </div>
          </>
        )}
      </div>
      
      <button onClick={() => { localStorage.clear(); setProfile(null); setDailyMeals([]); setCompletedExercises({0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[]}); setDailyBurnedCals(0); setSteps(0); setHistory({}); setCompletedDaysOfWeek([]); setOnboardingStep(1); setFoodDB(INITIAL_FOOD_DB); }} className="w-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 font-bold py-4 rounded-xl border border-red-200 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
        Reset App Data
      </button>
    </div>
  );

  // --- EARLY RETURNS ---
  if (!profile) return renderOnboarding();
  if (selectedExercise && !sessionPhase) return renderExerciseDetail();
  if (sessionPhase === 'exercises' && selectedExercise) return renderSessionFlow();

  // --- MAIN RETURN LOGIC ---
  return (
    <div className={theme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans flex flex-col max-w-md mx-auto relative shadow-2xl overflow-x-hidden transition-colors duration-300">
        
        {/* Top Header & Menu Option */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-40 bg-transparent pointer-events-none">
           <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm cursor-pointer pointer-events-auto" onClick={() => setMenuOpen(!menuOpen)}>
             <Menu className="w-5 h-5 text-gray-900 dark:text-white" />
           </div>
           
           <div className="relative pointer-events-auto">
             <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm cursor-pointer" onClick={() => setNotificationsOpen(!notificationsOpen)}>
               <Bell className="w-5 h-5 text-gray-900 dark:text-white" />
               {(dietNotificationsEnabled || waterNotificationsEnabled) && <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>}
             </div>
             
             {/* Notification Dropdown */}
             {notificationsOpen && (
               <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden animate-fade-in p-2">
                 <p className="text-xs font-bold text-gray-400 mb-2 px-2 pt-1">REMINDERS</p>
                 <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                    <span className="text-sm flex items-center text-gray-900 dark:text-white"><Apple className="w-4 h-4 mr-2 text-emerald-500"/> Diet</span>
                    <button onClick={() => setDietNotificationsEnabled(!dietNotificationsEnabled)} className={tc(`w-8 h-4 rounded-full relative transition-colors ${dietNotificationsEnabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`)}>
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${dietNotificationsEnabled ? 'left-4' : 'left-0.5'}`} />
                    </button>
                 </div>
                 <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                    <span className="text-sm flex items-center text-gray-900 dark:text-white"><Droplets className="w-4 h-4 mr-2 text-blue-500"/> Hydrate</span>
                    <button onClick={() => setWaterNotificationsEnabled(!waterNotificationsEnabled)} className={tc(`w-8 h-4 rounded-full relative transition-colors ${waterNotificationsEnabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`)}>
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${waterNotificationsEnabled ? 'left-4' : 'left-0.5'}`} />
                    </button>
                 </div>
               </div>
             )}
           </div>
        </div>

        {/* Hamburger Overlay Menu */}
        {menuOpen && (
          <div className="absolute inset-0 z-50 flex">
             <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)}></div>
             <div className="w-64 bg-white dark:bg-gray-950 shadow-2xl flex flex-col animate-fade-in p-6 border-r border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-black text-xl text-gray-900 dark:text-white">Menu</span>
                  <XCircle className="w-6 h-6 text-gray-400 cursor-pointer" onClick={() => setMenuOpen(false)}/>
                </div>
                <div className="space-y-4">
                  <button onClick={() => { setActiveTab('home'); setMenuOpen(false); }} className="w-full text-left font-bold py-2 flex items-center text-gray-800 dark:text-gray-200"><Home className={tc("w-5 h-5 mr-3 text-emerald-500")}/> Home</button>
                  <button onClick={() => { setActiveTab('diet'); setMenuOpen(false); }} className="w-full text-left font-bold py-2 flex items-center text-gray-800 dark:text-gray-200"><Apple className={tc("w-5 h-5 mr-3 text-emerald-500")}/> Calorie Counter</button>
                  <button onClick={() => { setActiveTab('analytics'); setMenuOpen(false); }} className="w-full text-left font-bold py-2 flex items-center text-gray-800 dark:text-gray-200"><BarChart2 className={tc("w-5 h-5 mr-3 text-emerald-500")}/> Analytics</button>
                  <button onClick={() => { setActiveTab('profile'); setMenuOpen(false); }} className="w-full text-left font-bold py-2 flex items-center text-gray-800 dark:text-gray-200"><Settings className={tc("w-5 h-5 mr-3 text-emerald-500")}/> Settings</button>
                </div>
                <div className="mt-auto border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between items-center">
                   <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Theme</span>
                   <button onClick={toggleTheme} className={tc("p-2 bg-gray-100 dark:bg-gray-900 rounded-full text-emerald-500 border border-gray-200 dark:border-gray-800")}>{theme === 'dark' ? <Moon className="w-4 h-4"/> : <Sun className="w-4 h-4"/>}</button>
                </div>
             </div>
          </div>
        )}

        {/* Session Flow Modals (Warmup / Cooldown) */}
        {sessionPhase && sessionPhase !== 'exercises' && (
           <div className="fixed inset-0 z-[110] bg-gray-50 dark:bg-gray-950 flex flex-col p-6 animate-fade-in text-gray-900 dark:text-white">
               <button onClick={() => {setSessionPhase(null); setSessionQueue([]);}} className="absolute top-6 left-6 p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"><XCircle className="text-gray-700 dark:text-gray-300 w-6 h-6"/></button>
               <div className="flex-1 flex flex-col justify-center items-center text-center">
                   {sessionPhase === 'warmup' && (
                       <>
                         <Flame className="w-20 h-20 text-orange-500 mb-6 animate-bounce" />
                         <h2 className="text-4xl font-black mb-2">Warm Up</h2>
                         <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-[250px]">Do 5 mins of light jogging or jumping jacks to get your heart rate up.</p>
                         <button onClick={() => setSessionPhase('stretches')} className={tc("w-full max-w-[250px] bg-emerald-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/20")}>Next: Stretches</button>
                       </>
                   )}
                   {sessionPhase === 'stretches' && (
                       <>
                         <Activity className="w-20 h-20 text-blue-500 mb-6 animate-pulse" />
                         <h2 className="text-4xl font-black mb-2">Dynamic Stretches</h2>
                         <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-[250px]">Focus on arm circles, leg swings, and torso twists.</p>
                         <button onClick={() => { setSessionPhase('exercises'); setSelectedExercise(sessionQueue[0]); }} className={tc("w-full max-w-[250px] bg-emerald-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/20")}>Start Exercises</button>
                       </>
                   )}
                   {sessionPhase === 'cooldown' && (
                       <>
                         <Droplets className="w-20 h-20 text-cyan-500 mb-6" />
                         <h2 className="text-4xl font-black mb-2">Cool Down</h2>
                         <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-[250px]">Static stretching and deep breathing. Don't forget to re-hydrate!</p>
                         <button onClick={() => { setSessionPhase(null); setSessionQueue([]); }} className={tc("w-full max-w-[250px] bg-emerald-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/20")}>Finish Session</button>
                       </>
                   )}
               </div>
            </div>
        )}

        {/* Pop-up Diet Alert Demo */}
        {showDietAlert && (
          <div className={tc("absolute top-20 left-4 right-4 z-50 bg-emerald-500 text-white p-4 rounded-2xl shadow-2xl flex items-start animate-fade-in")}>
             <Apple className="w-6 h-6 mr-3 shrink-0" />
             <div>
               <h4 className="font-bold">Meal Reminder!</h4>
               <p className="text-sm text-white/90 mt-1">Time for your {profile.goal === 'Weight loss' ? 'high protein/low carb' : 'caloric surplus'} meal.</p>
             </div>
             <button onClick={() => setShowDietAlert(false)} className="ml-auto p-1 bg-white/20 rounded-full"><XCircle className="w-4 h-4" /></button>
          </div>
        )}

        {/* Pop-up Hydrate Alert Demo */}
        {showWaterAlert && (
          <div className="absolute top-20 left-4 right-4 z-50 bg-blue-500 text-white p-4 rounded-2xl shadow-2xl flex items-start animate-fade-in">
             <Droplets className="w-6 h-6 mr-3 shrink-0" />
             <div>
               <h4 className="font-bold">Stay Hydrated!</h4>
               <p className="text-sm text-white/90 mt-1">Drink a glass of water now. Target: {((profile.weight * 35) / 1000).toFixed(1)}L today.</p>
             </div>
             <button onClick={() => setShowWaterAlert(false)} className="ml-auto p-1 bg-white/20 rounded-full"><XCircle className="w-4 h-4" /></button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pt-16">
          {activeTab === 'home' && renderDashboard()}
          {activeTab === 'diet' && renderDiet()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'profile' && renderProfile()}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center z-40">
          <button onClick={() => setActiveTab('home')} className={tc(`flex flex-col items-center transition-colors ${activeTab === 'home' ? 'text-emerald-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`)}>
            <Home className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">Plan</span>
          </button>
          <button onClick={() => setActiveTab('diet')} className={tc(`flex flex-col items-center transition-colors ${activeTab === 'diet' ? 'text-emerald-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`)}>
            <Apple className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">Diet</span>
          </button>
          <button onClick={() => setActiveTab('analytics')} className={tc(`flex flex-col items-center transition-colors ${activeTab === 'analytics' ? 'text-emerald-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`)}>
            <BarChart2 className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">Data</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={tc(`flex flex-col items-center transition-colors ${activeTab === 'profile' ? 'text-emerald-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`)}>
            <Settings className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">Settings</span>
          </button>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
          .custom-scrollbar::-webkit-scrollbar { height: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.4); border-radius: 10px; }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(75, 85, 99, 0.6); }
        `}} />
      </div>
    </div>
  );
}