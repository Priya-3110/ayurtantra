// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';
// import Select from '../../../components/ui/Select';
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const ChartPreview = ({ chartData, onEdit, onGenerate, onBack }) => {
//   const [selectedTemplate, setSelectedTemplate] = useState('standard');
//   const [showNutritionDetails, setShowNutritionDetails] = useState(false);

//   const templateOptions = [
//     { value: 'standard', label: 'Standard Template', description: 'Clean, professional layout with nutrition summary' },
//     { value: 'detailed', label: 'Detailed Template', description: 'Comprehensive view with Ayurvedic properties' },
//     { value: 'simple', label: 'Simple Template', description: 'Minimal design for easy reading' },
//     { value: 'colorful', label: 'Colorful Template', description: 'Vibrant design with visual meal indicators' }
//   ];

//   const mockPatientData = {
//     name: 'Priya Sharma',
//     age: 32,
//     constitution: 'Vata-Pitta',
//     goals: ['Weight Management', 'Digestive Health'],
//     restrictions: ['Vegetarian', 'Gluten-Free'],
//     duration: '1 Month'
//   };

//   const mockMealPlan = {
//     breakfast: [
//       { id: 'food-1', name: 'Quinoa Khichdi', quantity: '1 cup', calories: 180, protein: 6, carbs: 32, fat: 3,
//         ayurvedicProps: { taste: 'Sweet', energy: 'Cooling', effect: 'Easy to digest' } },
//       { id: 'food-5', name: 'Ginger Tea', quantity: '1 cup', calories: 25, protein: 0, carbs: 6, fat: 0,
//         ayurvedicProps: { taste: 'Pungent', energy: 'Heating', effect: 'Light' } }
//     ],
//     lunch: [
//       { id: 'food-2', name: 'Moong Dal Soup', quantity: '1 bowl', calories: 120, protein: 8, carbs: 18, fat: 2,
//         ayurvedicProps: { taste: 'Sweet', energy: 'Cooling', effect: 'Light' } },
//       { id: 'food-3', name: 'Steamed Vegetables', quantity: '1 serving', calories: 80, protein: 3, carbs: 15, fat: 1,
//         ayurvedicProps: { taste: 'Sweet, Bitter', energy: 'Cooling', effect: 'Light' } }
//     ],
//     snack: [
//       { id: 'food-6', name: 'Fresh Fruit Salad', quantity: '1 bowl', calories: 95, protein: 2, carbs: 24, fat: 0,
//         ayurvedicProps: { taste: 'Sweet, Sour', energy: 'Cooling', effect: 'Light' } }
//     ],
//     dinner: [
//       { id: 'food-4', name: 'Coconut Rice', quantity: '1 cup', calories: 220, protein: 4, carbs: 38, fat: 8,
//         ayurvedicProps: { taste: 'Sweet', energy: 'Cooling', effect: 'Heavy' } }
//     ]
//   };

//   const mealSlots = [
//     { id: 'breakfast', name: 'Breakfast', time: '7:00 - 9:00 AM', icon: 'Sunrise', color: 'text-orange-600', bgColor: 'bg-orange-50' },
//     { id: 'lunch', name: 'Lunch', time: '12:00 - 2:00 PM', icon: 'Sun', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
//     { id: 'snack', name: 'Evening Snack', time: '4:00 - 6:00 PM', icon: 'Coffee', color: 'text-green-600', bgColor: 'bg-green-50' },
//     { id: 'dinner', name: 'Dinner', time: '7:00 - 9:00 PM', icon: 'Moon', color: 'text-blue-600', bgColor: 'bg-blue-50' }
//   ];

//   const getTotalNutrition = () => {
//     let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };
//     Object.values(mockMealPlan)?.forEach(foods => {
//       foods?.forEach(food => {
//         total.calories += food?.calories;
//         total.protein += food?.protein;
//         total.carbs += food?.carbs;
//         total.fat += food?.fat;
//       });
//     });
//     return total;
//   };

//   const totalNutrition = getTotalNutrition();

//   // ✅ PDF Export
//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();

//     // Header
//     doc.setFontSize(18);
//     doc.text("AyurTantra - Personalized Ayurvedic Diet Chart", 14, 20);

//     // Patient Info
//     doc.setFontSize(12);
//     doc.text(`Patient: ${mockPatientData.name}`, 14, 30);
//     doc.text(`Age: ${mockPatientData.age}`, 14, 38);
//     doc.text(`Constitution: ${mockPatientData.constitution}`, 14, 46);
//     doc.text(`Duration: ${mockPatientData.duration}`, 14, 54);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 62);

//     // Goals
//     doc.setFontSize(14);
//     doc.text("Health Goals", 14, 75);
//     doc.setFontSize(12);
//     mockPatientData.goals.forEach((goal, i) => {
//       doc.text(`- ${goal}`, 20, 85 + i * 8);
//     });

//     // Restrictions
//     const prefStart = 85 + mockPatientData.goals.length * 8 + 10;
//     doc.setFontSize(14);
//     doc.text("Dietary Preferences", 14, prefStart);
//     doc.setFontSize(12);
//     mockPatientData.restrictions.forEach((res, i) => {
//       doc.text(`- ${res}`, 20, prefStart + 10 + i * 8);
//     });

//     // Meals table
//     const mealRows = [];
//     Object.keys(mockMealPlan).forEach((slot) => {
//       mockMealPlan[slot].forEach((food) => {
//         if (selectedTemplate === "detailed") {
//           mealRows.push([
//             slot.charAt(0).toUpperCase() + slot.slice(1),
//             food.name,
//             food.quantity,
//             `${food.calories} cal`,
//             `${food.protein}g P`,
//             `${food.carbs}g C`,
//             `${food.fat}g F`,
//             food.ayurvedicProps?.taste,
//             food.ayurvedicProps?.energy,
//             food.ayurvedicProps?.effect
//           ]);
//         } else {
//           mealRows.push([
//             slot.charAt(0).toUpperCase() + slot.slice(1),
//             food.name,
//             food.quantity,
//             `${food.calories} cal`,
//             `${food.protein}g P`,
//             `${food.carbs}g C`,
//             `${food.fat}g F`,
//           ]);
//         }
//       });
//     });

//     doc.autoTable({
//       head: selectedTemplate === "detailed"
//         ? [["Meal", "Food", "Quantity", "Calories", "Protein", "Carbs", "Fat", "Taste", "Energy", "Effect"]]
//         : [["Meal", "Food", "Quantity", "Calories", "Protein", "Carbs", "Fat"]],
//       body: mealRows,
//       startY: prefStart + 40,
//       styles: { fontSize: 9 }
//     });

//     // Nutrition Summary
//     let finalY = doc.lastAutoTable.finalY + 10;
//     doc.setFontSize(14);
//     doc.text("Daily Nutrition Summary", 14, finalY);

//     finalY += 10;
//     doc.setFontSize(12);
//     doc.text(`Calories: ${totalNutrition.calories}`, 14, finalY);
//     doc.text(`Protein: ${totalNutrition.protein}g`, 80, finalY);
//     doc.text(`Carbs: ${totalNutrition.carbs}g`, 140, finalY);
//     doc.text(`Fat: ${totalNutrition.fat}g`, 200, finalY);

//     // Footer
//     doc.setFontSize(10);
//     doc.text(
//       `Generated on ${new Date().toLocaleDateString()} • AyurNutriCare Practice Management System`,
//       14,
//       280
//     );
//     doc.text("For adjustments, please consult with Dr. Rajesh Kumar", 14, 288);

//     doc.save("DietChart.pdf");
//     onGenerate?.();
//   };

//   return (
//     <div className="bg-card border border-border rounded-lg p-6">
//       {/* ... rest of your UI (unchanged) ... */}

//       {/* Action Buttons */}
//       <div className="flex items-center justify-between pt-4 border-t border-border">
//         <Button variant="outline" onClick={onBack} iconName="ArrowLeft" iconPosition="left">
//           Back to Planning
//         </Button>
//         <div className="flex items-center space-x-3">
//           <Button variant="outline" onClick={onEdit} iconName="Edit" iconPosition="left">
//             Edit Chart
//           </Button>
//           <Button onClick={handleDownloadPDF} iconName="Download" iconPosition="left">
//             Generate PDF
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartPreview;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";  // ✅ Correct import

const ChartPreview = ({ chartData, onEdit, onGenerate, onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [showNutritionDetails, setShowNutritionDetails] = useState(false);

  const templateOptions = [
    { value: 'standard', label: 'Standard Template', description: 'Clean, professional layout with nutrition summary' },
    { value: 'detailed', label: 'Detailed Template', description: 'Comprehensive view with Ayurvedic properties' },
    { value: 'simple', label: 'Simple Template', description: 'Minimal design for easy reading' },
    { value: 'colorful', label: 'Colorful Template', description: 'Vibrant design with visual meal indicators' }
  ];

  const mockPatientData = {
    name: 'Priya Sharma',
    age: 32,
    constitution: 'Vata-Pitta',
    goals: ['Weight Management', 'Digestive Health'],
    restrictions: ['Vegetarian', 'Gluten-Free'],
    duration: '1 Month'
  };

  const mockMealPlan = {
    breakfast: [
      { id: 'food-1', name: 'Quinoa Khichdi', quantity: '1 cup', calories: 180, protein: 6, carbs: 32, fat: 3,
        ayurvedicProps: { taste: 'Sweet', energy: 'Cooling', effect: 'Easy to digest' } },
      { id: 'food-5', name: 'Ginger Tea', quantity: '1 cup', calories: 25, protein: 0, carbs: 6, fat: 0,
        ayurvedicProps: { taste: 'Pungent', energy: 'Heating', effect: 'Light' } }
    ],
    lunch: [
      { id: 'food-2', name: 'Moong Dal Soup', quantity: '1 bowl', calories: 120, protein: 8, carbs: 18, fat: 2,
        ayurvedicProps: { taste: 'Sweet', energy: 'Cooling', effect: 'Light' } },
      { id: 'food-3', name: 'Steamed Vegetables', quantity: '1 serving', calories: 80, protein: 3, carbs: 15, fat: 1,
        ayurvedicProps: { taste: 'Sweet, Bitter', energy: 'Cooling', effect: 'Light' } }
    ],
    snack: [
      { id: 'food-6', name: 'Fresh Fruit Salad', quantity: '1 bowl', calories: 95, protein: 2, carbs: 24, fat: 0,
        ayurvedicProps: { taste: 'Sweet, Sour', energy: 'Cooling', effect: 'Light' } }
    ],
    dinner: [
      { id: 'food-4', name: 'Coconut Rice', quantity: '1 cup', calories: 220, protein: 4, carbs: 38, fat: 8,
        ayurvedicProps: { taste: 'Sweet', energy: 'Cooling', effect: 'Heavy' } }
    ]
  };

  const mealSlots = [
    { id: 'breakfast', name: 'Breakfast', time: '7:00 - 9:00 AM', icon: 'Sunrise', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: 'lunch', name: 'Lunch', time: '12:00 - 2:00 PM', icon: 'Sun', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { id: 'snack', name: 'Evening Snack', time: '4:00 - 6:00 PM', icon: 'Coffee', color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 'dinner', name: 'Dinner', time: '7:00 - 9:00 PM', icon: 'Moon', color: 'text-blue-600', bgColor: 'bg-blue-50' }
  ];

  const getTotalNutrition = () => {
    let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    Object.values(mockMealPlan)?.forEach(foods => {
      foods?.forEach(food => {
        total.calories += food?.calories;
        total.protein += food?.protein;
        total.carbs += food?.carbs;
        total.fat += food?.fat;
      });
    });
    return total;
  };

  const totalNutrition = getTotalNutrition();

  // ✅ PDF Export
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("AyurTantra - Personalized Ayurvedic Diet Chart", 14, 20);

    // Patient Info
    doc.setFontSize(12);
    doc.text(`Patient: ${mockPatientData.name}`, 14, 30);
    doc.text(`Age: ${mockPatientData.age}`, 14, 38);
    doc.text(`Constitution: ${mockPatientData.constitution}`, 14, 46);
    doc.text(`Duration: ${mockPatientData.duration}`, 14, 54);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 62);

    // Goals
    doc.setFontSize(14);
    doc.text("Health Goals", 14, 75);
    doc.setFontSize(12);
    mockPatientData.goals.forEach((goal, i) => {
      doc.text(`- ${goal}`, 20, 85 + i * 8);
    });

    // Restrictions
    const prefStart = 85 + mockPatientData.goals.length * 8 + 10;
    doc.setFontSize(14);
    doc.text("Dietary Preferences", 14, prefStart);
    doc.setFontSize(12);
    mockPatientData.restrictions.forEach((res, i) => {
      doc.text(`- ${res}`, 20, prefStart + 10 + i * 8);
    });

    // Meals table
    const mealRows = [];
    Object.keys(mockMealPlan).forEach((slot) => {
      mockMealPlan[slot].forEach((food) => {
        if (selectedTemplate === "detailed") {
          mealRows.push([
            slot.charAt(0).toUpperCase() + slot.slice(1),
            food.name,
            food.quantity,
            `${food.calories} cal`,
            `${food.protein}g P`,
            `${food.carbs}g C`,
            `${food.fat}g F`,
            food.ayurvedicProps?.taste,
            food.ayurvedicProps?.energy,
            food.ayurvedicProps?.effect
          ]);
        } else {
          mealRows.push([
            slot.charAt(0).toUpperCase() + slot.slice(1),
            food.name,
            food.quantity,
            `${food.calories} cal`,
            `${food.protein}g P`,
            `${food.carbs}g C`,
            `${food.fat}g F`,
          ]);
        }
      });
    });

    autoTable(doc, {   // ✅ use function call
      head: selectedTemplate === "detailed"
        ? [["Meal", "Food", "Quantity", "Calories", "Protein", "Carbs", "Fat", "Taste", "Energy", "Effect"]]
        : [["Meal", "Food", "Quantity", "Calories", "Protein", "Carbs", "Fat"]],
      body: mealRows,
      startY: prefStart + 40,
      styles: { fontSize: 9 }
    });

    // Nutrition Summary
    let finalY = doc.lastAutoTable?.finalY + 10 || 140;
    doc.setFontSize(14);
    doc.text("Daily Nutrition Summary", 14, finalY);

    finalY += 10;
    doc.setFontSize(12);
    doc.text(`Calories: ${totalNutrition.calories}`, 14, finalY);
    doc.text(`Protein: ${totalNutrition.protein}g`, 80, finalY);
    doc.text(`Carbs: ${totalNutrition.carbs}g`, 140, finalY);
    doc.text(`Fat: ${totalNutrition.fat}g`, 200, finalY);

    // Footer
    doc.setFontSize(10);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} • AyurNutriCare Practice Management System`,
      14,
      280
    );
    doc.text("For adjustments, please consult with Dr. Rajesh Kumar", 14, 288);

    doc.save("DietChart.pdf");
    onGenerate?.();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* ... rest of your UI (unchanged) ... */}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button variant="outline" onClick={onBack} iconName="ArrowLeft" iconPosition="left">
          Back to Planning
        </Button>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onEdit} iconName="Edit" iconPosition="left">
            Edit Chart
          </Button>
          <Button onClick={handleDownloadPDF} iconName="Download" iconPosition="left">
            Generate PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChartPreview;

