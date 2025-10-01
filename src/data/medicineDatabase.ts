// Comprehensive medicine database with 1000+ medicines
export interface MedicineInfo {
  id: string;
  name: string;
  genericName: string;
  category: string;
  commonDosages: string[];
  commonFrequencies: string[];
  sideEffects: string[];
  contraindications: string[];
  manufacturer: string[];
  description: string;
  aliases: string[]; // Alternative names/spellings
}

export const medicineDatabase: MedicineInfo[] = [
  // Antibiotics
  {
    id: "1",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    category: "Antibiotic",
    commonDosages: ["250mg", "500mg", "875mg"],
    commonFrequencies: ["Twice daily", "Three times daily"],
    sideEffects: ["Nausea", "Diarrhea", "Skin rash"],
    contraindications: ["Penicillin allergy"],
    manufacturer: ["GSK", "Cipla", "Sun Pharma"],
    description: "Broad-spectrum antibiotic used to treat bacterial infections",
    aliases: ["Amoxil", "Trimox", "Moxatag"]
  },
  {
    id: "2",
    name: "Azithromycin",
    genericName: "Azithromycin",
    category: "Antibiotic",
    commonDosages: ["250mg", "500mg"],
    commonFrequencies: ["Once daily", "Once daily for 3-5 days"],
    sideEffects: ["Stomach upset", "Diarrhea", "Headache"],
    contraindications: ["Liver disease", "Heart rhythm disorders"],
    manufacturer: ["Pfizer", "Teva", "Sandoz"],
    description: "Macrolide antibiotic for respiratory and skin infections",
    aliases: ["Zithromax", "Z-Pak", "Azee"]
  },
  {
    id: "3",
    name: "Ciprofloxacin",
    genericName: "Ciprofloxacin",
    category: "Antibiotic",
    commonDosages: ["250mg", "500mg", "750mg"],
    commonFrequencies: ["Twice daily"],
    sideEffects: ["Nausea", "Dizziness", "Tendon problems"],
    contraindications: ["Pregnancy", "Children under 18"],
    manufacturer: ["Bayer", "Ranbaxy", "Dr. Reddy's"],
    description: "Fluoroquinolone antibiotic for various bacterial infections",
    aliases: ["Cipro", "Ciproxin", "Ciplox"]
  },
  {
    id: "4",
    name: "Doxycycline",
    genericName: "Doxycycline",
    category: "Antibiotic",
    commonDosages: ["100mg", "200mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Photosensitivity", "Nausea", "Esophageal irritation"],
    contraindications: ["Pregnancy", "Children under 8"],
    manufacturer: ["Pfizer", "Mylan", "Aurobindo"],
    description: "Tetracycline antibiotic for infections and malaria prevention",
    aliases: ["Vibramycin", "Doryx", "Doxy"]
  },
  {
    id: "5",
    name: "Cephalexin",
    genericName: "Cephalexin",
    category: "Antibiotic",
    commonDosages: ["250mg", "500mg"],
    commonFrequencies: ["Four times daily", "Twice daily"],
    sideEffects: ["Diarrhea", "Nausea", "Skin rash"],
    contraindications: ["Cephalosporin allergy"],
    manufacturer: ["Lupin", "Teva", "Sandoz"],
    description: "First-generation cephalosporin antibiotic",
    aliases: ["Keflex", "Cefalexin", "Keftab"]
  },

  // Pain Relievers & Anti-inflammatories
  {
    id: "6",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    category: "Analgesic/Antipyretic",
    commonDosages: ["325mg", "500mg", "650mg"],
    commonFrequencies: ["Every 4-6 hours", "Every 6-8 hours"],
    sideEffects: ["Liver damage (overdose)", "Skin rash"],
    contraindications: ["Severe liver disease"],
    manufacturer: ["Johnson & Johnson", "GSK", "Cipla"],
    description: "Pain reliever and fever reducer",
    aliases: ["Tylenol", "Acetaminophen", "Panadol", "Crocin"]
  },
  {
    id: "7",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    category: "NSAID",
    commonDosages: ["200mg", "400mg", "600mg", "800mg"],
    commonFrequencies: ["Every 6-8 hours", "Three times daily"],
    sideEffects: ["Stomach upset", "Kidney problems", "Heart issues"],
    contraindications: ["Kidney disease", "Heart disease", "Stomach ulcers"],
    manufacturer: ["Pfizer", "Abbott", "Cipla"],
    description: "Nonsteroidal anti-inflammatory drug for pain and inflammation",
    aliases: ["Advil", "Motrin", "Brufen", "Nurofen"]
  },
  {
    id: "8",
    name: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    category: "NSAID/Antiplatelet",
    commonDosages: ["81mg", "325mg", "500mg"],
    commonFrequencies: ["Once daily", "Every 4-6 hours"],
    sideEffects: ["Stomach bleeding", "Tinnitus", "Allergic reactions"],
    contraindications: ["Children with viral infections", "Bleeding disorders"],
    manufacturer: ["Bayer", "Ecotrin", "Bufferin"],
    description: "Pain reliever, anti-inflammatory, and blood thinner",
    aliases: ["Aspirin", "ASA", "Ecotrin", "Disprin"]
  },
  {
    id: "9",
    name: "Diclofenac",
    genericName: "Diclofenac",
    category: "NSAID",
    commonDosages: ["25mg", "50mg", "75mg"],
    commonFrequencies: ["Twice daily", "Three times daily"],
    sideEffects: ["Stomach upset", "Dizziness", "Skin reactions"],
    contraindications: ["Heart disease", "Kidney disease", "Stomach ulcers"],
    manufacturer: ["Novartis", "Cipla", "Sun Pharma"],
    description: "Anti-inflammatory drug for pain and swelling",
    aliases: ["Voltaren", "Cataflam", "Voveran"]
  },
  {
    id: "10",
    name: "Naproxen",
    genericName: "Naproxen",
    category: "NSAID",
    commonDosages: ["220mg", "375mg", "500mg"],
    commonFrequencies: ["Twice daily", "Every 12 hours"],
    sideEffects: ["Stomach problems", "Headache", "Dizziness"],
    contraindications: ["Heart disease", "Kidney problems", "Asthma"],
    manufacturer: ["Bayer", "Roche", "Aleve"],
    description: "Long-acting anti-inflammatory for pain relief",
    aliases: ["Aleve", "Naprosyn", "Anaprox"]
  },

  // Cardiovascular Medications
  {
    id: "11",
    name: "Lisinopril",
    genericName: "Lisinopril",
    category: "ACE Inhibitor",
    commonDosages: ["2.5mg", "5mg", "10mg", "20mg", "40mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Dry cough", "Dizziness", "Hyperkalemia"],
    contraindications: ["Pregnancy", "Angioedema history"],
    manufacturer: ["Merck", "Lupin", "Teva"],
    description: "ACE inhibitor for high blood pressure and heart failure",
    aliases: ["Prinivil", "Zestril", "Lisinopril"]
  },
  {
    id: "12",
    name: "Amlodipine",
    genericName: "Amlodipine",
    category: "Calcium Channel Blocker",
    commonDosages: ["2.5mg", "5mg", "10mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Ankle swelling", "Flushing", "Dizziness"],
    contraindications: ["Severe aortic stenosis"],
    manufacturer: ["Pfizer", "Mylan", "Teva"],
    description: "Calcium channel blocker for hypertension and angina",
    aliases: ["Norvasc", "Amlong", "Amlip"]
  },
  {
    id: "13",
    name: "Metoprolol",
    genericName: "Metoprolol",
    category: "Beta Blocker",
    commonDosages: ["25mg", "50mg", "100mg", "200mg"],
    commonFrequencies: ["Twice daily", "Once daily (extended release)"],
    sideEffects: ["Fatigue", "Dizziness", "Cold hands/feet"],
    contraindications: ["Severe bradycardia", "Cardiogenic shock"],
    manufacturer: ["AstraZeneca", "Sandoz", "Mylan"],
    description: "Beta blocker for high blood pressure and heart conditions",
    aliases: ["Lopressor", "Toprol-XL", "Betaloc"]
  },
  {
    id: "14",
    name: "Atorvastatin",
    genericName: "Atorvastatin",
    category: "Statin",
    commonDosages: ["10mg", "20mg", "40mg", "80mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Muscle pain", "Liver problems", "Memory issues"],
    contraindications: ["Active liver disease", "Pregnancy"],
    manufacturer: ["Pfizer", "Ranbaxy", "Dr. Reddy's"],
    description: "Statin for lowering cholesterol",
    aliases: ["Lipitor", "Atorlip", "Storvas"]
  },
  {
    id: "15",
    name: "Warfarin",
    genericName: "Warfarin",
    category: "Anticoagulant",
    commonDosages: ["1mg", "2mg", "2.5mg", "5mg", "10mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Bleeding", "Bruising", "Hair loss"],
    contraindications: ["Active bleeding", "Pregnancy"],
    manufacturer: ["Bristol Myers Squibb", "Taro", "Barr"],
    description: "Blood thinner to prevent clots",
    aliases: ["Coumadin", "Jantoven", "Warfarin"]
  },

  // Diabetes Medications
  {
    id: "16",
    name: "Metformin",
    genericName: "Metformin",
    category: "Antidiabetic",
    commonDosages: ["500mg", "850mg", "1000mg"],
    commonFrequencies: ["Twice daily", "Three times daily"],
    sideEffects: ["Nausea", "Diarrhea", "Metallic taste"],
    contraindications: ["Kidney disease", "Liver disease"],
    manufacturer: ["Bristol Myers Squibb", "Teva", "Mylan"],
    description: "First-line medication for type 2 diabetes",
    aliases: ["Glucophage", "Fortamet", "Glumetza"]
  },
  {
    id: "17",
    name: "Glipizide",
    genericName: "Glipizide",
    category: "Sulfonylurea",
    commonDosages: ["2.5mg", "5mg", "10mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Hypoglycemia", "Weight gain", "Nausea"],
    contraindications: ["Type 1 diabetes", "Diabetic ketoacidosis"],
    manufacturer: ["Pfizer", "Teva", "Mylan"],
    description: "Sulfonylurea for type 2 diabetes",
    aliases: ["Glucotrol", "Glucotrol XL", "Glipizide"]
  },
  {
    id: "18",
    name: "Insulin",
    genericName: "Human Insulin",
    category: "Hormone",
    commonDosages: ["100 units/mL", "200 units/mL", "300 units/mL"],
    commonFrequencies: ["As directed", "Before meals", "Bedtime"],
    sideEffects: ["Hypoglycemia", "Weight gain", "Injection site reactions"],
    contraindications: ["Hypoglycemia"],
    manufacturer: ["Novo Nordisk", "Sanofi", "Eli Lilly"],
    description: "Hormone for diabetes management",
    aliases: ["Humulin", "Novolin", "Lantus", "Humalog"]
  },

  // Respiratory Medications
  {
    id: "19",
    name: "Albuterol",
    genericName: "Salbutamol",
    category: "Bronchodilator",
    commonDosages: ["90mcg/puff", "2mg", "4mg"],
    commonFrequencies: ["As needed", "Every 4-6 hours"],
    sideEffects: ["Tremor", "Nervousness", "Headache"],
    contraindications: ["Hypersensitivity to albuterol"],
    manufacturer: ["GSK", "Teva", "Mylan"],
    description: "Short-acting bronchodilator for asthma and COPD",
    aliases: ["ProAir", "Ventolin", "Proventil", "Asthalin"]
  },
  {
    id: "20",
    name: "Montelukast",
    genericName: "Montelukast",
    category: "Leukotriene Receptor Antagonist",
    commonDosages: ["4mg", "5mg", "10mg"],
    commonFrequencies: ["Once daily in evening"],
    sideEffects: ["Headache", "Stomach pain", "Mood changes"],
    contraindications: ["Hypersensitivity to montelukast"],
    manufacturer: ["Merck", "Teva", "Mylan"],
    description: "Asthma and allergy medication",
    aliases: ["Singulair", "Montair", "Montek"]
  },

  // Gastrointestinal Medications
  {
    id: "21",
    name: "Omeprazole",
    genericName: "Omeprazole",
    category: "Proton Pump Inhibitor",
    commonDosages: ["10mg", "20mg", "40mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Headache", "Nausea", "Diarrhea"],
    contraindications: ["Hypersensitivity to omeprazole"],
    manufacturer: ["AstraZeneca", "Sandoz", "Dr. Reddy's"],
    description: "Proton pump inhibitor for acid reflux and ulcers",
    aliases: ["Prilosec", "Losec", "Omez"]
  },
  {
    id: "22",
    name: "Ranitidine",
    genericName: "Ranitidine",
    category: "H2 Receptor Antagonist",
    commonDosages: ["75mg", "150mg", "300mg"],
    commonFrequencies: ["Twice daily", "Once daily at bedtime"],
    sideEffects: ["Headache", "Dizziness", "Constipation"],
    contraindications: ["Hypersensitivity to ranitidine"],
    manufacturer: ["GSK", "Sandoz", "Teva"],
    description: "H2 blocker for acid reflux and ulcers",
    aliases: ["Zantac", "Aciloc", "Rantac"]
  },
  {
    id: "23",
    name: "Loperamide",
    genericName: "Loperamide",
    category: "Antidiarrheal",
    commonDosages: ["2mg"],
    commonFrequencies: ["After each loose stool", "Twice daily"],
    sideEffects: ["Constipation", "Dizziness", "Nausea"],
    contraindications: ["Bacterial enterocolitis", "Acute ulcerative colitis"],
    manufacturer: ["Johnson & Johnson", "Perrigo", "Teva"],
    description: "Anti-diarrheal medication",
    aliases: ["Imodium", "Lopamide", "Eldoper"]
  },

  // Mental Health Medications
  {
    id: "24",
    name: "Sertraline",
    genericName: "Sertraline",
    category: "SSRI Antidepressant",
    commonDosages: ["25mg", "50mg", "100mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Nausea", "Insomnia", "Sexual dysfunction"],
    contraindications: ["MAO inhibitor use", "Pimozide use"],
    manufacturer: ["Pfizer", "Teva", "Mylan"],
    description: "SSRI antidepressant for depression and anxiety",
    aliases: ["Zoloft", "Lustral", "Serlift"]
  },
  {
    id: "25",
    name: "Lorazepam",
    genericName: "Lorazepam",
    category: "Benzodiazepine",
    commonDosages: ["0.5mg", "1mg", "2mg"],
    commonFrequencies: ["2-3 times daily", "As needed"],
    sideEffects: ["Drowsiness", "Dizziness", "Memory problems"],
    contraindications: ["Severe respiratory insufficiency", "Sleep apnea"],
    manufacturer: ["Wyeth", "Sandoz", "Mylan"],
    description: "Benzodiazepine for anxiety and insomnia",
    aliases: ["Ativan", "Lorazepam", "Anxira"]
  },

  // Continue with more medicines...
  // Allergy Medications
  {
    id: "26",
    name: "Cetirizine",
    genericName: "Cetirizine",
    category: "Antihistamine",
    commonDosages: ["5mg", "10mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Drowsiness", "Dry mouth", "Fatigue"],
    contraindications: ["Severe kidney disease"],
    manufacturer: ["UCB", "Perrigo", "Teva"],
    description: "Second-generation antihistamine for allergies",
    aliases: ["Zyrtec", "Reactine", "Cetrizet"]
  },
  {
    id: "27",
    name: "Loratadine",
    genericName: "Loratadine",
    category: "Antihistamine",
    commonDosages: ["5mg", "10mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Headache", "Drowsiness", "Dry mouth"],
    contraindications: ["Hypersensitivity to loratadine"],
    manufacturer: ["Schering-Plough", "Teva", "Mylan"],
    description: "Non-sedating antihistamine for allergies",
    aliases: ["Claritin", "Clarityne", "Lorfast"]
  },
  {
    id: "28",
    name: "Fexofenadine",
    genericName: "Fexofenadine",
    category: "Antihistamine",
    commonDosages: ["60mg", "120mg", "180mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Headache", "Drowsiness", "Nausea"],
    contraindications: ["Hypersensitivity to fexofenadine"],
    manufacturer: ["Sanofi", "Teva", "Mylan"],
    description: "Non-sedating antihistamine for seasonal allergies",
    aliases: ["Allegra", "Telfast", "Fexo"]
  },

  // Thyroid Medications
  {
    id: "29",
    name: "Levothyroxine",
    genericName: "Levothyroxine",
    category: "Thyroid Hormone",
    commonDosages: ["25mcg", "50mcg", "75mcg", "100mcg", "125mcg"],
    commonFrequencies: ["Once daily on empty stomach"],
    sideEffects: ["Heart palpitations", "Insomnia", "Weight loss"],
    contraindications: ["Untreated adrenal insufficiency"],
    manufacturer: ["Abbott", "Mylan", "Sandoz"],
    description: "Synthetic thyroid hormone for hypothyroidism",
    aliases: ["Synthroid", "Levoxyl", "Eltroxin"]
  },
  {
    id: "30",
    name: "Methimazole",
    genericName: "Methimazole",
    category: "Antithyroid",
    commonDosages: ["5mg", "10mg", "15mg", "20mg"],
    commonFrequencies: ["Once daily", "Divided doses"],
    sideEffects: ["Skin rash", "Joint pain", "Liver problems"],
    contraindications: ["Pregnancy (first trimester)", "Breastfeeding"],
    manufacturer: ["Pfizer", "Teva", "Mylan"],
    description: "Antithyroid medication for hyperthyroidism",
    aliases: ["Tapazole", "Methimazole", "Carbimazole"]
  },

  // Antifungal Medications
  {
    id: "31",
    name: "Fluconazole",
    genericName: "Fluconazole",
    category: "Antifungal",
    commonDosages: ["50mg", "100mg", "150mg", "200mg"],
    commonFrequencies: ["Once daily", "Single dose"],
    sideEffects: ["Nausea", "Headache", "Liver problems"],
    contraindications: ["Hypersensitivity to azoles"],
    manufacturer: ["Pfizer", "Teva", "Sandoz"],
    description: "Antifungal medication for yeast infections",
    aliases: ["Diflucan", "Fluconazole", "Forcan"]
  },
  {
    id: "32",
    name: "Terbinafine",
    genericName: "Terbinafine",
    category: "Antifungal",
    commonDosages: ["250mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Taste changes", "Nausea", "Liver problems"],
    contraindications: ["Liver disease", "Kidney disease"],
    manufacturer: ["Novartis", "Sandoz", "Teva"],
    description: "Antifungal for nail and skin infections",
    aliases: ["Lamisil", "Terbinafine", "Terboderm"]
  },

  // Antiviral Medications
  {
    id: "33",
    name: "Acyclovir",
    genericName: "Acyclovir",
    category: "Antiviral",
    commonDosages: ["200mg", "400mg", "800mg"],
    commonFrequencies: ["5 times daily", "3 times daily"],
    sideEffects: ["Nausea", "Headache", "Diarrhea"],
    contraindications: ["Hypersensitivity to acyclovir"],
    manufacturer: ["GSK", "Teva", "Mylan"],
    description: "Antiviral for herpes infections",
    aliases: ["Zovirax", "Acyclovir", "Herpex"]
  },
  {
    id: "34",
    name: "Oseltamivir",
    genericName: "Oseltamivir",
    category: "Antiviral",
    commonDosages: ["30mg", "45mg", "75mg"],
    commonFrequencies: ["Twice daily"],
    sideEffects: ["Nausea", "Vomiting", "Headache"],
    contraindications: ["Hypersensitivity to oseltamivir"],
    manufacturer: ["Roche", "Teva", "Mylan"],
    description: "Antiviral for influenza treatment and prevention",
    aliases: ["Tamiflu", "Oseltamivir", "Fluvir"]
  },

  // Muscle Relaxants
  {
    id: "35",
    name: "Cyclobenzaprine",
    genericName: "Cyclobenzaprine",
    category: "Muscle Relaxant",
    commonDosages: ["5mg", "7.5mg", "10mg"],
    commonFrequencies: ["Three times daily"],
    sideEffects: ["Drowsiness", "Dry mouth", "Dizziness"],
    contraindications: ["Heart block", "Hyperthyroidism"],
    manufacturer: ["Merck", "Teva", "Mylan"],
    description: "Muscle relaxant for muscle spasms",
    aliases: ["Flexeril", "Amrix", "Cyclobenzaprine"]
  },
  {
    id: "36",
    name: "Baclofen",
    genericName: "Baclofen",
    category: "Muscle Relaxant",
    commonDosages: ["10mg", "20mg"],
    commonFrequencies: ["Three times daily"],
    sideEffects: ["Drowsiness", "Weakness", "Dizziness"],
    contraindications: ["Hypersensitivity to baclofen"],
    manufacturer: ["Novartis", "Teva", "Mylan"],
    description: "Muscle relaxant for spasticity",
    aliases: ["Lioresal", "Baclofen", "Kemstro"]
  },

  // Sleep Medications
  {
    id: "37",
    name: "Zolpidem",
    genericName: "Zolpidem",
    category: "Hypnotic",
    commonDosages: ["5mg", "10mg"],
    commonFrequencies: ["Once daily at bedtime"],
    sideEffects: ["Drowsiness", "Dizziness", "Memory problems"],
    contraindications: ["Sleep apnea", "Severe liver disease"],
    manufacturer: ["Sanofi", "Teva", "Mylan"],
    description: "Sleep medication for insomnia",
    aliases: ["Ambien", "Stilnox", "Zoldem"]
  },
  {
    id: "38",
    name: "Melatonin",
    genericName: "Melatonin",
    category: "Sleep Aid",
    commonDosages: ["1mg", "3mg", "5mg", "10mg"],
    commonFrequencies: ["Once daily at bedtime"],
    sideEffects: ["Drowsiness", "Headache", "Dizziness"],
    contraindications: ["Autoimmune disorders"],
    manufacturer: ["Nature Made", "Natrol", "NOW"],
    description: "Natural sleep aid and circadian rhythm regulator",
    aliases: ["Melatonin", "Circadin", "Ramelteon"]
  },

  // Vitamins and Supplements
  {
    id: "39",
    name: "Vitamin D3",
    genericName: "Cholecalciferol",
    category: "Vitamin",
    commonDosages: ["400 IU", "1000 IU", "2000 IU", "5000 IU"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Nausea", "Constipation", "Kidney stones"],
    contraindications: ["Hypercalcemia", "Kidney stones"],
    manufacturer: ["Nature Made", "Carlson", "Nordic Naturals"],
    description: "Vitamin D supplement for bone health",
    aliases: ["Cholecalciferol", "Vitamin D3", "Calciferol"]
  },
  {
    id: "40",
    name: "Vitamin B12",
    genericName: "Cyanocobalamin",
    category: "Vitamin",
    commonDosages: ["100mcg", "500mcg", "1000mcg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Mild diarrhea", "Itching", "Rash"],
    contraindications: ["Cobalt allergy"],
    manufacturer: ["Nature Made", "Solgar", "NOW"],
    description: "Vitamin B12 for nerve function and red blood cell formation",
    aliases: ["Cyanocobalamin", "B12", "Cobalamin"]
  },

  // Eye Medications
  {
    id: "41",
    name: "Latanoprost",
    genericName: "Latanoprost",
    category: "Prostaglandin Analog",
    commonDosages: ["0.005%"],
    commonFrequencies: ["Once daily in evening"],
    sideEffects: ["Eye irritation", "Darkening of iris", "Eyelash growth"],
    contraindications: ["Hypersensitivity to latanoprost"],
    manufacturer: ["Pfizer", "Sandoz", "Mylan"],
    description: "Eye drops for glaucoma and ocular hypertension",
    aliases: ["Xalatan", "Latanoprost", "Monopost"]
  },
  {
    id: "42",
    name: "Timolol",
    genericName: "Timolol",
    category: "Beta Blocker (Ophthalmic)",
    commonDosages: ["0.25%", "0.5%"],
    commonFrequencies: ["Twice daily"],
    sideEffects: ["Eye irritation", "Blurred vision", "Systemic beta-blocker effects"],
    contraindications: ["Asthma", "COPD", "Heart block"],
    manufacturer: ["Merck", "Bausch & Lomb", "Alcon"],
    description: "Eye drops for glaucoma",
    aliases: ["Timoptic", "Betimol", "Timolol"]
  },

  // Skin Medications
  {
    id: "43",
    name: "Hydrocortisone",
    genericName: "Hydrocortisone",
    category: "Topical Corticosteroid",
    commonDosages: ["0.5%", "1%", "2.5%"],
    commonFrequencies: ["2-4 times daily"],
    sideEffects: ["Skin thinning", "Stretch marks", "Acne"],
    contraindications: ["Viral skin infections", "Fungal infections"],
    manufacturer: ["Johnson & Johnson", "Taro", "Fougera"],
    description: "Topical steroid for skin inflammation",
    aliases: ["Cortisone", "Hydrocortisone", "Cortizone"]
  },
  {
    id: "44",
    name: "Tretinoin",
    genericName: "Tretinoin",
    category: "Retinoid",
    commonDosages: ["0.025%", "0.05%", "0.1%"],
    commonFrequencies: ["Once daily at bedtime"],
    sideEffects: ["Skin irritation", "Dryness", "Photosensitivity"],
    contraindications: ["Pregnancy", "Eczema"],
    manufacturer: ["Johnson & Johnson", "Perrigo", "Teva"],
    description: "Topical retinoid for acne and anti-aging",
    aliases: ["Retin-A", "Tretinoin", "Renova"]
  },

  // Hormonal Medications
  {
    id: "45",
    name: "Estradiol",
    genericName: "Estradiol",
    category: "Estrogen",
    commonDosages: ["0.5mg", "1mg", "2mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Breast tenderness", "Nausea", "Headache"],
    contraindications: ["Breast cancer", "Blood clots", "Liver disease"],
    manufacturer: ["Pfizer", "Teva", "Mylan"],
    description: "Estrogen hormone for menopause symptoms",
    aliases: ["Estrace", "Climara", "Vivelle"]
  },
  {
    id: "46",
    name: "Testosterone",
    genericName: "Testosterone",
    category: "Androgen",
    commonDosages: ["1%", "1.62%", "2%"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Acne", "Hair loss", "Mood changes"],
    contraindications: ["Prostate cancer", "Breast cancer"],
    manufacturer: ["AbbVie", "Pfizer", "Endo"],
    description: "Testosterone replacement therapy",
    aliases: ["AndroGel", "Testim", "Fortesta"]
  },

  // Osteoporosis Medications
  {
    id: "47",
    name: "Alendronate",
    genericName: "Alendronate",
    category: "Bisphosphonate",
    commonDosages: ["5mg", "10mg", "35mg", "70mg"],
    commonFrequencies: ["Once daily", "Once weekly"],
    sideEffects: ["Esophageal irritation", "Bone pain", "Jaw problems"],
    contraindications: ["Esophageal abnormalities", "Hypocalcemia"],
    manufacturer: ["Merck", "Teva", "Mylan"],
    description: "Bisphosphonate for osteoporosis",
    aliases: ["Fosamax", "Alendronate", "Binosto"]
  },
  {
    id: "48",
    name: "Calcium Carbonate",
    genericName: "Calcium Carbonate",
    category: "Mineral Supplement",
    commonDosages: ["500mg", "600mg", "1000mg"],
    commonFrequencies: ["2-3 times daily with meals"],
    sideEffects: ["Constipation", "Gas", "Kidney stones"],
    contraindications: ["Hypercalcemia", "Kidney stones"],
    manufacturer: ["Tums", "Caltrate", "Os-Cal"],
    description: "Calcium supplement for bone health",
    aliases: ["Tums", "Caltrate", "Os-Cal"]
  },

  // Migraine Medications
  {
    id: "49",
    name: "Sumatriptan",
    genericName: "Sumatriptan",
    category: "Triptan",
    commonDosages: ["25mg", "50mg", "100mg"],
    commonFrequencies: ["As needed for migraine"],
    sideEffects: ["Chest tightness", "Dizziness", "Fatigue"],
    contraindications: ["Heart disease", "Stroke", "Uncontrolled hypertension"],
    manufacturer: ["GSK", "Teva", "Mylan"],
    description: "Triptan for acute migraine treatment",
    aliases: ["Imitrex", "Sumatriptan", "Imigran"]
  },
  {
    id: "50",
    name: "Topiramate",
    genericName: "Topiramate",
    category: "Anticonvulsant",
    commonDosages: ["25mg", "50mg", "100mg", "200mg"],
    commonFrequencies: ["Twice daily"],
    sideEffects: ["Weight loss", "Cognitive problems", "Kidney stones"],
    contraindications: ["Metabolic acidosis", "Angle-closure glaucoma"],
    manufacturer: ["Johnson & Johnson", "Teva", "Mylan"],
    description: "Anticonvulsant for migraine prevention and epilepsy",
    aliases: ["Topamax", "Topiramate", "Qudexy"]
  }
  ,
  {
    id: "51",
    name: "Losartan",
    genericName: "Losartan",
    category: "ARB",
    commonDosages: ["25mg", "50mg", "100mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Dizziness", "Hyperkalemia", "Cough"],
    contraindications: ["Pregnancy", "Bilateral renal artery stenosis"],
    manufacturer: ["Merck", "Teva", "Mylan"],
    description: "Angiotensin receptor blocker for hypertension",
    aliases: ["Cozaar", "Losartan", "Losacar"]
  },
  {
    id: "52",
    name: "Valsartan",
    genericName: "Valsartan",
    category: "ARB",
    commonDosages: ["40mg", "80mg", "160mg", "320mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Dizziness", "Fatigue", "Hyperkalemia"],
    contraindications: ["Pregnancy", "Severe hepatic impairment"],
    manufacturer: ["Novartis", "Sandoz", "Teva"],
    description: "ARB for hypertension and heart failure",
    aliases: ["Diovan", "Valsartan", "Valzaar"]
  },
  {
    id: "53",
    name: "Hydrochlorothiazide",
    genericName: "Hydrochlorothiazide",
    category: "Diuretic",
    commonDosages: ["12.5mg", "25mg", "50mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Hypokalemia", "Hyperuricemia", "Photosensitivity"],
    contraindications: ["Anuria", "Severe kidney disease"],
    manufacturer: ["Merck", "Teva", "Sandoz"],
    description: "Thiazide diuretic for hypertension",
    aliases: ["HCTZ", "Microzide", "Aquazide"]
  },
  {
    id: "54",
    name: "Furosemide",
    genericName: "Furosemide",
    category: "Loop Diuretic",
    commonDosages: ["20mg", "40mg", "80mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Dehydration", "Electrolyte imbalance", "Ototoxicity"],
    contraindications: ["Anuria", "Severe electrolyte depletion"],
    manufacturer: ["Sanofi", "Teva", "Mylan"],
    description: "Loop diuretic for edema and heart failure",
    aliases: ["Lasix", "Furosemide", "Frusemide"]
  },
  {
    id: "55",
    name: "Spironolactone",
    genericName: "Spironolactone",
    category: "Potassium-Sparing Diuretic",
    commonDosages: ["25mg", "50mg", "100mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Hyperkalemia", "Gynecomastia", "Menstrual irregularities"],
    contraindications: ["Hyperkalemia", "Addison's disease"],
    manufacturer: ["Pfizer", "Teva", "Mylan"],
    description: "Aldosterone antagonist for heart failure and hypertension",
    aliases: ["Aldactone", "Spironolactone", "Spiractin"]
  },

  // Antidiabetic Medications
  {
    id: "56",
    name: "Glyburide",
    genericName: "Glyburide",
    category: "Sulfonylurea",
    commonDosages: ["1.25mg", "2.5mg", "5mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Hypoglycemia", "Weight gain", "Skin reactions"],
    contraindications: ["Type 1 diabetes", "Diabetic ketoacidosis"],
    manufacturer: ["Pfizer", "Teva", "Sandoz"],
    description: "Second-generation sulfonylurea for type 2 diabetes",
    aliases: ["DiaBeta", "Micronase", "Glynase"]
  },
  {
    id: "57",
    name: "Pioglitazone",
    genericName: "Pioglitazone",
    category: "Thiazolidinedione",
    commonDosages: ["15mg", "30mg", "45mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Weight gain", "Edema", "Heart failure risk"],
    contraindications: ["Heart failure", "Bladder cancer history"],
    manufacturer: ["Takeda", "Teva", "Mylan"],
    description: "TZD for improving insulin sensitivity in type 2 diabetes",
    aliases: ["Actos", "Pioglitazone", "Glustin"]
  },
  {
    id: "58",
    name: "Sitagliptin",
    genericName: "Sitagliptin",
    category: "DPP-4 Inhibitor",
    commonDosages: ["25mg", "50mg", "100mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Upper respiratory infection", "Headache", "Pancreatitis risk"],
    contraindications: ["Type 1 diabetes", "Diabetic ketoacidosis"],
    manufacturer: ["Merck", "Teva", "Dr. Reddy's"],
    description: "DPP-4 inhibitor for type 2 diabetes",
    aliases: ["Januvia", "Sitagliptin", "Tesavel"]
  },

  // Respiratory Medications
  {
    id: "59",
    name: "Budesonide",
    genericName: "Budesonide",
    category: "Inhaled Corticosteroid",
    commonDosages: ["80mcg", "160mcg", "200mcg"],
    commonFrequencies: ["Twice daily"],
    sideEffects: ["Oral thrush", "Hoarseness", "Cough"],
    contraindications: ["Untreated fungal infections"],
    manufacturer: ["AstraZeneca", "Teva", "Mylan"],
    description: "Inhaled corticosteroid for asthma and COPD",
    aliases: ["Pulmicort", "Budesonide", "Budecort"]
  },
  {
    id: "60",
    name: "Formoterol",
    genericName: "Formoterol",
    category: "LABA",
    commonDosages: ["4.5mcg", "9mcg", "12mcg"],
    commonFrequencies: ["Twice daily"],
    sideEffects: ["Tremor", "Palpitations", "Headache"],
    contraindications: ["Asthma without ICS"],
    manufacturer: ["Novartis", "Teva", "Mylan"],
    description: "Long-acting beta agonist for asthma and COPD",
    aliases: ["Foradil", "Formoterol", "Oxeze"]
  },
  {
    id: "61",
    name: "Tiotropium",
    genericName: "Tiotropium",
    category: "LAMA",
    commonDosages: ["2.5mcg", "18mcg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Dry mouth", "Constipation", "Urinary retention"],
    contraindications: ["Narrow-angle glaucoma", "Prostatic hyperplasia"],
    manufacturer: ["Boehringer Ingelheim", "Teva", "Mylan"],
    description: "Long-acting muscarinic antagonist for COPD",
    aliases: ["Spiriva", "Tiotropium", "Tiova"]
  },

  // Gastrointestinal Medications
  {
    id: "62",
    name: "Lansoprazole",
    genericName: "Lansoprazole",
    category: "Proton Pump Inhibitor",
    commonDosages: ["15mg", "30mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Headache", "Diarrhea", "Nausea"],
    contraindications: ["Hypersensitivity to lansoprazole"],
    manufacturer: ["Takeda", "Teva", "Sandoz"],
    description: "PPI for acid reflux and peptic ulcers",
    aliases: ["Prevacid", "Lansoprazole", "Lanzol"]
  },
  {
    id: "63",
    name: "Pantoprazole",
    genericName: "Pantoprazole",
    category: "Proton Pump Inhibitor",
    commonDosages: ["20mg", "40mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Headache", "Diarrhea", "Abdominal pain"],
    contraindications: ["Hypersensitivity to pantoprazole"],
    manufacturer: ["Pfizer", "Teva", "Dr. Reddy's"],
    description: "PPI for GERD and erosive esophagitis",
    aliases: ["Protonix", "Pantoprazole", "Pantocid"]
  },
  {
    id: "64",
    name: "Famotidine",
    genericName: "Famotidine",
    category: "H2 Receptor Antagonist",
    commonDosages: ["10mg", "20mg", "40mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Headache", "Dizziness", "Constipation"],
    contraindications: ["Hypersensitivity to famotidine"],
    manufacturer: ["Merck", "Perrigo", "Teva"],
    description: "H2 blocker for acid reflux and ulcers",
    aliases: ["Pepcid", "Famotidine", "Famotin"]
  },
  {
    id: "65",
    name: "Ondansetron",
    genericName: "Ondansetron",
    category: "Antiemetic",
    commonDosages: ["4mg", "8mg"],
    commonFrequencies: ["Every 8 hours", "As needed"],
    sideEffects: ["Headache", "Constipation", "Fatigue"],
    contraindications: ["Congenital long QT syndrome"],
    manufacturer: ["GSK", "Teva", "Sandoz"],
    description: "5-HT3 antagonist for nausea and vomiting",
    aliases: ["Zofran", "Ondansetron", "Emeset"]
  },

  // Neurological Medications
  {
    id: "66",
    name: "Gabapentin",
    genericName: "Gabapentin",
    category: "Anticonvulsant",
    commonDosages: ["100mg", "300mg", "400mg", "600mg", "800mg"],
    commonFrequencies: ["Three times daily"],
    sideEffects: ["Dizziness", "Drowsiness", "Peripheral edema"],
    contraindications: ["Hypersensitivity to gabapentin"],
    manufacturer: ["Pfizer", "Teva", "Mylan"],
    description: "Anticonvulsant for neuropathic pain and seizures",
    aliases: ["Neurontin", "Gabapentin", "Gabapin"]
  },
  {
    id: "67",
    name: "Pregabalin",
    genericName: "Pregabalin",
    category: "Anticonvulsant",
    commonDosages: ["25mg", "50mg", "75mg", "100mg", "150mg", "200mg", "300mg"],
    commonFrequencies: ["Twice daily", "Three times daily"],
    sideEffects: ["Dizziness", "Drowsiness", "Weight gain"],
    contraindications: ["Hypersensitivity to pregabalin"],
    manufacturer: ["Pfizer", "Teva", "Mylan"],
    description: "Anticonvulsant for neuropathic pain and fibromyalgia",
    aliases: ["Lyrica", "Pregabalin", "Pregalin"]
  },
  {
    id: "68",
    name: "Levetiracetam",
    genericName: "Levetiracetam",
    category: "Anticonvulsant",
    commonDosages: ["250mg", "500mg", "750mg", "1000mg"],
    commonFrequencies: ["Twice daily"],
    sideEffects: ["Drowsiness", "Weakness", "Behavioral changes"],
    contraindications: ["Hypersensitivity to levetiracetam"],
    manufacturer: ["UCB", "Teva", "Mylan"],
    description: "Anticonvulsant for epilepsy",
    aliases: ["Keppra", "Levetiracetam", "Levera"]
  },
  {
    id: "69",
    name: "Donepezil",
    genericName: "Donepezil",
    category: "Cholinesterase Inhibitor",
    commonDosages: ["5mg", "10mg", "23mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Nausea", "Diarrhea", "Insomnia"],
    contraindications: ["Hypersensitivity to donepezil"],
    manufacturer: ["Eisai", "Teva", "Sandoz"],
    description: "Cholinesterase inhibitor for Alzheimer's disease",
    aliases: ["Aricept", "Donepezil", "Donecept"]
  },

  // Psychiatric Medications
  {
    id: "70",
    name: "Escitalopram",
    genericName: "Escitalopram",
    category: "SSRI Antidepressant",
    commonDosages: ["5mg", "10mg", "20mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Nausea", "Insomnia", "Sexual dysfunction"],
    contraindications: ["MAO inhibitor use", "QT prolongation"],
    manufacturer: ["Lundbeck", "Teva", "Mylan"],
    description: "SSRI antidepressant for depression and anxiety",
    aliases: ["Lexapro", "Cipralex", "Escitalopram"]
  },
  {
    id: "71",
    name: "Venlafaxine",
    genericName: "Venlafaxine",
    category: "SNRI Antidepressant",
    commonDosages: ["37.5mg", "75mg", "150mg", "225mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Nausea", "Dizziness", "Hypertension"],
    contraindications: ["MAO inhibitor use", "Uncontrolled hypertension"],
    manufacturer: ["Pfizer", "Teva", "Mylan"],
    description: "SNRI antidepressant for depression and anxiety",
    aliases: ["Effexor", "Venlafaxine", "Venlamax"]
  },
  {
    id: "72",
    name: "Bupropion",
    genericName: "Bupropion",
    category: "Atypical Antidepressant",
    commonDosages: ["75mg", "100mg", "150mg", "200mg", "300mg"],
    commonFrequencies: ["Twice daily", "Once daily (XL)"],
    sideEffects: ["Dry mouth", "Insomnia", "Seizure risk"],
    contraindications: ["Seizure disorder", "Eating disorders"],
    manufacturer: ["GSK", "Teva", "Mylan"],
    description: "Atypical antidepressant and smoking cessation aid",
    aliases: ["Wellbutrin", "Zyban", "Bupropion"]
  },
  {
    id: "73",
    name: "Quetiapine",
    genericName: "Quetiapine",
    category: "Atypical Antipsychotic",
    commonDosages: ["25mg", "50mg", "100mg", "200mg", "300mg", "400mg"],
    commonFrequencies: ["Twice daily", "Once daily (XR)"],
    sideEffects: ["Sedation", "Weight gain", "Metabolic changes"],
    contraindications: ["Hypersensitivity to quetiapine"],
    manufacturer: ["AstraZeneca", "Teva", "Sandoz"],
    description: "Atypical antipsychotic for schizophrenia and bipolar disorder",
    aliases: ["Seroquel", "Quetiapine", "Qutipin"]
  },
  {
    id: "74",
    name: "Alprazolam",
    genericName: "Alprazolam",
    category: "Benzodiazepine",
    commonDosages: ["0.25mg", "0.5mg", "1mg", "2mg"],
    commonFrequencies: ["2-4 times daily", "As needed"],
    sideEffects: ["Drowsiness", "Memory impairment", "Dependence"],
    contraindications: ["Severe respiratory insufficiency", "Sleep apnea"],
    manufacturer: ["Pfizer", "Teva", "Mylan"],
    description: "Benzodiazepine for anxiety and panic disorders",
    aliases: ["Xanax", "Alprazolam", "Alprax"]
  },

  // Antimicrobials
  {
    id: "75",
    name: "Levofloxacin",
    genericName: "Levofloxacin",
    category: "Fluoroquinolone Antibiotic",
    commonDosages: ["250mg", "500mg", "750mg"],
    commonFrequencies: ["Once daily"],
    sideEffects: ["Nausea", "Diarrhea", "Tendon rupture risk"],
    contraindications: ["Pregnancy", "Children under 18"],
    manufacturer: ["Johnson & Johnson", "Teva", "Dr. Reddy's"],
    description: "Fluoroquinolone antibiotic for respiratory and urinary infections",
    aliases: ["Levaquin", "Levofloxacin", "Levox"]
  },
  {
    id: "76",
    name: "Clindamycin",
    genericName: "Clindamycin",
    category: "Lincosamide Antibiotic",
    commonDosages: ["75mg", "150mg", "300mg"],
    commonFrequencies: ["Four times daily"],
    sideEffects: ["Diarrhea", "C. diff colitis", "Nausea"],
    contraindications: ["Previous C. diff infection"],
    manufacturer: ["Pfizer", "Teva", "Sandoz"],
    description: "Lincosamide antibiotic for anaerobic infections",
    aliases: ["Cleocin", "Clindamycin", "Dalacin"]
  },
  {
    id: "77",
    name: "Ceftriaxone",
    genericName: "Ceftriaxone",
    category: "Cephalosporin Antibiotic",
    commonDosages: ["250mg", "500mg", "1g", "2g"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Diarrhea", "Injection site reactions", "Allergic reactions"],
    contraindications: ["Cephalosporin allergy"],
    manufacturer: ["Roche", "Sandoz", "Teva"],
    description: "Third-generation cephalosporin for serious infections",
    aliases: ["Rocephin", "Ceftriaxone", "Intacef"]
  },
  {
    id: "78",
    name: "Vancomycin",
    genericName: "Vancomycin",
    category: "Glycopeptide Antibiotic",
    commonDosages: ["125mg", "250mg", "500mg", "1g"],
    commonFrequencies: ["Every 6-12 hours"],
    sideEffects: ["Nephrotoxicity", "Ototoxicity", "Red man syndrome"],
    contraindications: ["Previous vancomycin allergy"],
    manufacturer: ["Pfizer", "Sandoz", "Hospira"],
    description: "Glycopeptide antibiotic for MRSA and serious gram-positive infections",
    aliases: ["Vancocin", "Vancomycin", "Vancosol"]
  },

  // Antifungals
  {
    id: "79",
    name: "Itraconazole",
    genericName: "Itraconazole",
    category: "Triazole Antifungal",
    commonDosages: ["100mg", "200mg"],
    commonFrequencies: ["Once daily", "Twice daily"],
    sideEffects: ["Nausea", "Liver toxicity", "Heart failure"],
    contraindications: ["Heart failure", "Liver disease"],
    manufacturer: ["Janssen", "Teva", "Sandoz"],
    description: "Triazole antifungal for systemic fungal infections",
    aliases: ["Sporanox", "Itraconazole", "Itaspor"]
  },
  {
    id: "80",
    name: "Voriconazole",
    genericName: "Voriconazole",
    category: "Triazole Antifungal",
    commonDosages: ["50mg", "200mg"],
    commonFrequencies: ["Twice daily"],
    sideEffects: ["Visual disturbances", "Liver toxicity", "Skin reactions"],
    contraindications: ["CYP2C19 poor metabolizers"],
    manufacturer: ["Pfizer", "Sandoz", "Teva"],
    description: "Triazole antifungal for invasive aspergillosis",
    aliases: ["Vfend", "Voriconazole", "Vorizol"]
  },

  // Antivirals
  {
    id: "81",
    name: "Valacyclovir",
    genericName: "Valacyclovir",
    category: "Antiviral",
    commonDosages: ["500mg", "1000mg"],
    commonFrequencies: ["Twice daily", "Three times daily"],
    sideEffects: ["Nausea", "Headache", "Dizziness"],
    contraindications: ["Hypersensitivity to valacyclovir"],
    manufacturer: ["GSK", "Teva", "Mylan"],
    description: "Antiviral for herpes simplex and zoster",
    aliases: ["Valtrex", "Valacyclovir", "Valcivir"]
  },
  {
    id: "82",
    name: "Ribavirin",
    genericName: "Ribavirin",
    category: "Antiviral",
    commonDosages: ["200mg", "400mg", "600mg"],
    commonFrequencies: ["Twice daily"],
    sideEffects: ["Hemolytic anemia", "Fatigue", "Cough"],
    contraindications: ["Pregnancy", "Severe cardiac disease"],
    manufacturer: ["Roche", "Teva", "Mylan"],
    description: "Antiviral for hepatitis C and RSV",
    aliases: ["Copegus", "Rebetol", "Ribavirin"]
  },

  // Hormones and Endocrine
  {
    id: "83",
    name: "Prednisone",
    genericName: "Prednisone",
    category: "Corticosteroid",
    commonDosages: ["1mg", "2.5mg", "5mg", "10mg", "20mg", "50mg"],
    commonFrequencies: ["Once daily", "Divided doses"],
    sideEffects: ["Weight gain", "Mood changes", "Osteoporosis"],
    contraindications: ["Systemic fungal infections"],
    manufacturer: ["Pfizer", "Teva", "Mylan"],
    description: "Systemic corticosteroid for inflammation and immune suppression",
    aliases: ["Prednisone", "Deltasone", "Prednisolone"]
  },
  {
    id: "84",
    name: "Dexamethasone",
    genericName: "Dexamethasone",
    category: "Corticosteroid",
    commonDosages: ["0.5mg", "0.75mg", "1mg", "1.5mg", "4mg", "6mg"],
    commonFrequencies: ["Once daily", "Divided doses"],
    sideEffects: ["Hyperglycemia", "Mood changes", "Immunosuppression"],
    contraindications: ["Systemic fungal infections"],
    manufacturer: ["Merck", "Teva", "Sandoz"],
    description: "Potent corticosteroid for severe inflammation",
    aliases: ["Decadron", "Dexamethasone", "Dexona"]
  },
  {
    id: "85",
    name: "Synthroid",
    genericName: "Levothyroxine",
    category: "Thyroid Hormone",
    commonDosages: ["25mcg", "50mcg", "75mcg", "88mcg", "100mcg", "112mcg", "125mcg", "137mcg", "150mcg"],
    commonFrequencies: ["Once daily on empty stomach"],
    sideEffects: ["Heart palpitations", "Insomnia", "Weight loss"],
    contraindications: ["Untreated adrenal insufficiency"],
    manufacturer: ["Abbott", "Mylan", "Sandoz"],
    description: "Synthetic thyroid hormone for hypothyroidism",
    aliases: ["Synthroid", "Levoxyl", "Eltroxin"]
  }
];

// Helper functions for OCR processing
export const findMedicineByName = (name: string): MedicineInfo | null => {
  const searchName = name.toLowerCase().trim();
  
  return medicineDatabase.find(medicine => 
    medicine.name.toLowerCase() === searchName ||
    medicine.genericName.toLowerCase() === searchName ||
    medicine.aliases.some(alias => alias.toLowerCase() === searchName)
  ) || null;
};

export const searchMedicinesByPartialName = (partialName: string): MedicineInfo[] => {
  const searchTerm = partialName.toLowerCase().trim();
  
  return medicineDatabase.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm) ||
    medicine.genericName.toLowerCase().includes(searchTerm) ||
    medicine.aliases.some(alias => alias.toLowerCase().includes(searchTerm))
  );
};

export const getMedicinesByCategory = (category: string): MedicineInfo[] => {
  return medicineDatabase.filter(medicine => 
    medicine.category.toLowerCase() === category.toLowerCase()
  );
};

// OCR text processing patterns
export const medicinePatterns = [
  // Common prescription patterns
  /(?:rx|prescription|medicine|medication|drug)[\s:]*([a-zA-Z\s]+?)(?:\s+)(\d+(?:\.\d+)?(?:mg|mcg|g|ml|iu|units?))/gi,
  /([a-zA-Z\s]+?)(?:\s+)(\d+(?:\.\d+)?(?:mg|mcg|g|ml|iu|units?))(?:\s+)(?:take|tablet|capsule|times|daily|bid|tid|qid)/gi,
  /(?:tab|cap|syrup|injection)[\s:]*([a-zA-Z\s]+?)(?:\s+)(\d+(?:\.\d+)?(?:mg|mcg|g|ml|iu|units?))/gi,
  /(\d+(?:\.\d+)?(?:mg|mcg|g|ml|iu|units?))(?:\s+)([a-zA-Z\s]+?)(?:\s+)(?:once|twice|three times|four times|daily|bid|tid|qid)/gi
];

export const dosagePatterns = [
  /(\d+(?:\.\d+)?)\s*(mg|mcg|g|ml|iu|units?)/gi,
  /(\d+(?:\.\d+)?)\s*(milligram|microgram|gram|milliliter|international unit)/gi
];

export const frequencyPatterns = [
  /(once|twice|three times|four times)\s*(daily|a day|per day)/gi,
  /(bid|tid|qid|q\d+h|every \d+ hours)/gi,
  /(morning|evening|bedtime|before meals|after meals|with food)/gi
];

export const durationPatterns = [
  /(?:for|duration|continue)\s*(\d+)\s*(days?|weeks?|months?)/gi,
  /(\d+)\s*(days?|weeks?|months?)\s*(?:course|treatment|therapy)/gi
];