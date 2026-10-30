const form = document.querySelector("#search-form");
const courseSelect = form.elements.course;
const submitButton = form.querySelector('button[type="submit"]');
const formStatus = document.querySelector("#form-status");
const results = document.querySelector("#results");
const resultsGrid = document.querySelector("#results-grid");
const resultsTitle = document.querySelector("#results-title");
const resultsSummary = document.querySelector("#results-summary");
const resultsCount = document.querySelector("#results-count");
const continentSelect = form.elements.continent;
const countrySelect = form.elements.country;
const regionSelect = form.elements.region;
const campusCitySelect = form.elements.campusCity;
const cutoffSelect = form.elements.cutoff;
let colleges = [];

const countryContinents = {
  Australia: "Oceania",
  Brazil: "South America",
  Canada: "North America",
  China: "Asia",
  Germany: "Europe",
  France: "Europe",
  India: "Asia",
  Ireland: "Europe",
  Japan: "Asia",
  Malaysia: "Asia",
  Netherlands: "Europe",
  "New Zealand": "Oceania",
  Singapore: "Asia",
  "South Africa": "Africa",
  "South Korea": "Asia",
  Sweden: "Europe",
  Switzerland: "Europe",
  "United Arab Emirates": "Asia",
  "United Kingdom": "Europe",
  "United States": "North America",
};

const allContinents = ["Africa", "Antarctica", "Asia", "Europe", "North America", "Oceania", "South America"];

const localCollegeWebsites = {
  "mit-chennai": "https://www.mitindia.edu/",
  "cit-chennai": "https://www.citchennai.edu.in/",
  "crescent-chennai": "https://crescent.education/",
  "saveetha-chennai": "https://saveetha.ac.in/",
  "rajalakshmi-engineering": "https://www.rajalakshmi.org/",
  "sri-sairam": "https://sairam.edu.in/",
  panimalar: "https://panimalar.ac.in/",
  "vel-tech": "https://www.veltech.edu.in/",
  "rajalakshmi-institute-technology": "https://www.ritchennai.org/",
  "kings-engineering": "https://kingsengineeringcollege.edu.in/",
  "st-josephs-engineering": "https://www.stjosephs.ac.in/",
  "sri-venkateswara-engineering": "https://www.svce.ac.in/",
  "anand-engineering": "https://www.aith.ac.in/",
  "sri-muthukumaran-engineering": "https://www.smit.edu.in/",
  "tjs-engineering": "https://www.tjsec.edu.in/",
  "dmi-college-of-engineering": "https://dmice.ac.in/",
  "loyola-chennai": "https://www.loyolacollege.edu/",
  "mcc-chennai": "https://mcc.edu.in/",
  "st-josephs-trichy": "https://sjctni.edu/",
  // below-150 colleges
  "sathyabama-university": "https://www.sathyabama.ac.in/",
  "jeppiaar-engineering": "https://www.jeppiaarcollege.org/",
  "misrimal-navajee-munoth-jain": "https://www.mjcollege.ac.in/",
  "sree-sastha-engineering": "https://sreesastha.ac.in/",
  "easwari-engineering": "https://easwariengg.ac.in/",
};

const globalCollegeRows = [
  ["iit-bombay", "Indian Institute of Technology Bombay", "Mumbai", "Maharashtra", "India", "https://www.iitb.ac.in/"],
  ["iit-hyderabad", "Indian Institute of Technology Hyderabad", "Sangareddy", "Telangana", "India", "https://www.iith.ac.in/"],
  ["mahe-manipal", "Manipal Academy of Higher Education", "Manipal", "Karnataka", "India", "https://www.manipal.edu/"],
  ["iisc", "Indian Institute of Science", "Bengaluru", "Karnataka", "India", "https://iisc.ac.in/"],
  ["nit-trichy", "National Institute of Technology Tiruchirappalli", "Tiruchirappalli", "Tamil Nadu", "India", "https://www.nitt.edu/"],
  ["vit-vellore", "Vellore Institute of Technology", "Vellore", "Tamil Nadu", "India", "https://vit.ac.in/"],
  ["mit-cambridge", "Massachusetts Institute of Technology", "Cambridge", "Massachusetts", "United States", "https://www.mit.edu/"],
  ["oxford", "University of Oxford", "Oxford", "England", "United Kingdom", "https://www.ox.ac.uk/"],
  ["cambridge", "University of Cambridge", "Cambridge", "England", "United Kingdom", "https://www.cam.ac.uk/"],
  ["university-of-toronto", "University of Toronto", "Toronto", "Ontario", "Canada", "https://www.utoronto.ca/"],
  ["university-of-melbourne", "University of Melbourne", "Melbourne", "Victoria", "Australia", "https://www.unimelb.edu.au/"],
  ["university-of-manchester", "University of Manchester", "Manchester", "England", "United Kingdom", "https://www.manchester.ac.uk/"],
  ["harvard", "Harvard University", "Cambridge", "Massachusetts", "United States", "https://www.harvard.edu/"],
  ["stanford", "Stanford University", "Stanford", "California", "United States", "https://www.stanford.edu/"],
  ["yale", "Yale University", "New Haven", "Connecticut", "United States", "https://www.yale.edu/"],
  ["princeton", "Princeton University", "Princeton", "New Jersey", "United States", "https://www.princeton.edu/"],
  ["uc-berkeley", "University of California, Berkeley", "Berkeley", "California", "United States", "https://www.berkeley.edu/"],
  ["caltech", "California Institute of Technology", "Pasadena", "California", "United States", "https://www.caltech.edu/"],
  ["mcgill", "McGill University", "Montreal", "Quebec", "Canada", "https://www.mcgill.ca/"],
  ["ubc", "University of British Columbia", "Vancouver", "British Columbia", "Canada", "https://www.ubc.ca/"],
  ["eth-zurich", "ETH Zurich", "Zurich", "Zurich", "Switzerland", "https://ethz.ch/"],
  ["imperial-college-london", "Imperial College London", "London", "England", "United Kingdom", "https://www.imperial.ac.uk/"],
  ["university-of-amsterdam", "University of Amsterdam", "Amsterdam", "North Holland", "Netherlands", "https://www.uva.nl/"],
  ["tu-delft", "Delft University of Technology", "Delft", "South Holland", "Netherlands", "https://www.tudelft.nl/"],
  ["sorbonne-university", "Sorbonne University", "Paris", "Ile-de-France", "France", "https://www.sorbonne-universite.fr/en"],
  ["nus", "National University of Singapore", "Singapore", "Singapore", "Singapore", "https://www.nus.edu.sg/"],
  ["university-of-tokyo", "The University of Tokyo", "Tokyo", "Tokyo", "Japan", "https://www.u-tokyo.ac.jp/en/"],
  ["tsinghua", "Tsinghua University", "Beijing", "Beijing", "China", "https://www.tsinghua.edu.cn/en/"],
  ["university-of-sydney", "The University of Sydney", "Sydney", "New South Wales", "Australia", "https://www.sydney.edu.au/"],
  ["university-of-cape-town", "University of Cape Town", "Cape Town", "Western Cape", "South Africa", "https://www.uct.ac.za/"],
  ["university-of-sao-paulo", "University of Sao Paulo", "Sao Paulo", "Sao Paulo", "Brazil", "https://www5.usp.br/"],
  ["delhi-technological-university", "Delhi Technological University", "Delhi", "Delhi", "India", "https://dtu.ac.in/", "170-190"],
  ["jadavpur-university", "Jadavpur University", "Kolkata", "West Bengal", "India", "https://jadavpuruniversity.in/", "170-190"],
  ["university-of-hyderabad", "University of Hyderabad", "Hyderabad", "Telangana", "India", "https://uohyd.ac.in/", "150-170"],
  ["iit-kanpur", "Indian Institute of Technology Kanpur", "Kanpur", "Uttar Pradesh", "India", "https://www.iitk.ac.in/", "190-200"],
  ["iit-gandhinagar", "Indian Institute of Technology Gandhinagar", "Gandhinagar", "Gujarat", "India", "https://iitgn.ac.in/", "190-200"],
  ["savitribai-phule-pune-university", "Savitribai Phule Pune University", "Pune", "Maharashtra", "India", "https://www.unipune.ac.in/", "150-170"],
  ["christ-delhi-ncr", "Christ University Delhi NCR Campus", "Ghaziabad", "Uttar Pradesh", "India", "https://ncr.christuniversity.in/", "below-150"],
  ["university-of-bonn", "University of Bonn", "Bonn", "North Rhine-Westphalia", "Germany", "https://www.uni-bonn.de/en"],
  ["technical-university-of-munich", "Technical University of Munich", "Munich", "Bavaria", "Germany", "https://www.tum.de/en/"],
  ["trinity-college-dublin", "Trinity College Dublin", "Dublin", "Leinster", "Ireland", "https://www.tcd.ie/"],
  ["university-college-dublin", "University College Dublin", "Dublin", "Leinster", "Ireland", "https://www.ucd.ie/"],
  ["university-of-auckland", "University of Auckland", "Auckland", "Auckland", "New Zealand", "https://www.auckland.ac.nz/"],
  ["university-of-otago", "University of Otago", "Dunedin", "Otago", "New Zealand", "https://www.otago.ac.nz/"],
  ["university-of-malaya", "University of Malaya", "Kuala Lumpur", "Kuala Lumpur", "Malaysia", "https://www.um.edu.my/"],
  ["universiti-putra-malaysia", "Universiti Putra Malaysia", "Serdang", "Selangor", "Malaysia", "https://www.upm.edu.my/"],
  ["kaist", "Korea Advanced Institute of Science and Technology", "Daejeon", "Daejeon", "South Korea", "https://www.kaist.ac.kr/en/"],
  ["seoul-national-university", "Seoul National University", "Seoul", "Seoul", "South Korea", "https://en.snu.ac.kr/"],
  ["kth-royal-institute-of-technology", "KTH Royal Institute of Technology", "Stockholm", "Stockholm County", "Sweden", "https://www.kth.se/en"],
  ["lund-university", "Lund University", "Lund", "Skane County", "Sweden", "https://www.lunduniversity.lu.se/"],
  ["khalifa-university", "Khalifa University", "Abu Dhabi", "Abu Dhabi", "United Arab Emirates", "https://www.ku.ac.ae/"],
  ["american-university-of-sharjah", "American University of Sharjah", "Sharjah", "Sharjah", "United Arab Emirates", "https://www.aus.edu/"],
].map(([id, name, city, state, country, website, cutoffBand]) => ({
  id,
  name,
  city,
  state,
  country,
  type: country === "India" ? "INDIAN COLLEGE / UNIVERSITY" : "INTERNATIONAL UNIVERSITY",
  address: `${city}, ${state}, ${country}`,
  overview: country === "India"
    ? "Indian college profile included as a starting point. Confirm current programs and admission requirements with the institution."
    : "International university profile included as a starting point. Admission requirements, eligible programs, and fees vary by course and applicant; confirm details with the institution.",
  cutoffBand,
  programs: id === "mahe-manipal"
    ? ["Computer Science", "Engineering", "Business Administration", "Science", "Medicine", "MBBS", "BDS", "B.Sc. Nursing", "B.Pharm", "PharmD"]
    : ["Computer Science", "Engineering", "Business Administration", "Science"],
  website,
  contactSource: website,
  programSource: website,
  fees: {
    summary: "Tuition and other costs vary by course, residency, and academic year. Check the institution's official admissions information.",
    period: "Program-specific",
    source: website,
  },
  contacts: [],
}));

const localColleges = [
  ["mit-chennai", "Madras Institute of Technology", "Chromepet", "190-200", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Mechanical Engineering", "Automobile Engineering"]],
  ["cit-chennai", "Chennai Institute of Technology", "Kundrathur", "190-200", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["crescent-chennai", "B.S. Abdur Rahman Crescent Institute of Science and Technology", "Vandalur", "190-200", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["saveetha-chennai", "Saveetha Engineering College", "Thandalam", "190-200", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["rajalakshmi-engineering", "Rajalakshmi Engineering College", "Thandalam", "170-190", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["sri-sairam", "Sri Sairam Engineering College", "West Tambaram", "170-190", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["panimalar", "Panimalar Engineering College", "Poonamallee", "170-190", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["vel-tech", "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology", "Avadi", "170-190", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["rajalakshmi-institute-technology", "Rajalakshmi Institute of Technology", "Kuthambakkam", "170-190", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["kings-engineering", "Kings Engineering College", "Irungattukottai", "150-170", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["st-josephs-engineering", "St. Joseph's College of Engineering", "OMR, Chennai", "150-170", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["sri-venkateswara-engineering", "Sri Venkateswara College of Engineering", "Pennalur", "150-170", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["anand-engineering", "Anand Institute of Higher Technology", "Kazhipattur", "below-150", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["sri-muthukumaran-engineering", "Sri Muthukumaran Institute of Technology", "Chikkarayapuram", "below-150", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["tjs-engineering", "T.J.S. Engineering College", "Peruvoyal", "below-150", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  // 150 and below cutoff band
  ["sathyabama-university", "Sathyabama Institute of Science and Technology", "Sholinganallur", "below-150", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["jeppiaar-engineering", "Jeppiaar Engineering College", "Sriperumbudur", "below-150", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["misrimal-navajee-munoth-jain", "Misrimal Navajee Munoth Jain Engineering College", "Thoraipakkam", "below-150", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["sree-sastha-engineering", "Sree Sastha Institute of Engineering and Technology", "Chembarambakkam", "below-150", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  ["easwari-engineering", "Easwari Engineering College", "Ramapuram", "below-150", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
  // No cutoff band (arts & science colleges)
  ["loyola-chennai", "Loyola College", "Nungambakkam", "", ["B.A. Economics", "B.A. History", "B.A. English", "B.A. Sociology", "B.Sc. Computer Science", "B.Sc. Mathematics", "B.Sc. Physics", "B.Sc. Chemistry", "B.Sc. Biology", "B.Com. Commerce"]],

  ["mcc-chennai", "Madras Christian College", "Tambaram", "", ["B.A. Economics", "B.A. History", "B.A. English", "B.A. Political Science", "B.Sc. Computer Science", "B.Sc. Mathematics", "B.Sc. Physics", "B.Sc. Chemistry", "B.Sc. Zoology", "B.Com. Commerce"]],
  ["st-josephs-trichy", "St. Joseph's College, Tiruchirappalli", "Tiruchirappalli", "", ["B.A. Economics", "B.A. History", "B.A. English", "B.Sc. Computer Science", "B.Sc. Mathematics", "B.Sc. Physics", "B.Sc. Chemistry", "B.Com. Commerce"]],
  ["dmi-college-of-engineering", "DMI College of Engineering", "Palanchoor", "", ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"]],
].map(([id, name, city, cutoffBand, programs]) => ({
  id,
  name,
  city,
  state: "Tamil Nadu",
  country: "India",
  type: "COLLEGE",
  address: `${city}, Tamil Nadu, India`,
  overview: "College profile included as a starting point. Check the institution's official admissions information for current programs and eligibility.",
  programs,
  cutoffBand,
  website: localCollegeWebsites[id],
  contactSource: localCollegeWebsites[id],
  programSource: localCollegeWebsites[id],
  fees: {
    summary: "Fees vary by course, category, and academic year. Confirm current fees with the institution.",
    period: "Admission-cycle specific",
    source: localCollegeWebsites[id],
  },
  contacts: [],
}));

function continentFor(college) {
  return college.continent || countryContinents[college.country] || "Other";
}

function distinctSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function setOptions(select, placeholder, values) {
  const previousValue = select.value;
  select.replaceChildren(new Option(placeholder, ""));
  distinctSorted(values).forEach((value) => select.add(new Option(value, value)));
  if (values.includes(previousValue)) select.value = previousValue;
}

function populateLocationFilters() {
  setOptions(continentSelect, "All continents", allContinents);
  updateCountries();
}

function updateCountries() {
  const continent = continentSelect.value;
  setOptions(countrySelect, "All countries", colleges
    .filter((college) => !continent || continentFor(college) === continent)
    .map((college) => college.country));
  updateRegions();
}

function updateRegions() {
  const continent = continentSelect.value;
  const country = countrySelect.value;
  setOptions(regionSelect, "All states / regions", colleges
    .filter((college) => (!continent || continentFor(college) === continent) && (!country || college.country === country))
    .map((college) => college.state));
  updateCampusCities();
}

function updateCampusCities() {
  const continent = continentSelect.value;
  const country = countrySelect.value;
  const region = regionSelect.value;
  setOptions(campusCitySelect, "All cities", colleges
    .filter((college) => (!continent || continentFor(college) === continent)
      && (!country || college.country === country)
      && (!region || college.state === region))
    .map((college) => college.city));
  updateCutoffOptions();
}

function updateCutoffOptions() {
  const selectedCutoff = cutoffSelect.value;
  const continent = continentSelect.value;
  const country = countrySelect.value;
  const region = regionSelect.value;
  const campusCity = campusCitySelect.value;
  const course = courseSelect.value;
  const filteredColleges = colleges.filter((college) =>
    (!continent || continentFor(college) === continent)
    && (!country || college.country === country)
    && (!region || college.state === region)
    && (!campusCity || college.city === campusCity)
    && (!course || collegeListsCourse(college, course)));
  const bandOrder = ["190-200", "170-190", "150-170", "below-150"];
  const ranges = distinctSorted(filteredColleges.map((college) => college.cutoffBand))
    .sort((a, b) => {
      const ai = bandOrder.indexOf(a);
      const bi = bandOrder.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return Number(b.split("-")[0]) - Number(a.split("-")[0]);
    });
  cutoffSelect.replaceChildren(new Option("Show all admission ranges", ""));
  ranges.forEach((range) => cutoffSelect.add(new Option(formatCutoffBand(range), range)));
  if (filteredColleges.some((college) => !college.cutoffBand)) {
    cutoffSelect.add(new Option("No comparable cutoff listed", "not-listed"));
  }
  if ([...cutoffSelect.options].some((option) => option.value === selectedCutoff)) {
    cutoffSelect.value = selectedCutoff;
  }
}

continentSelect.addEventListener("change", updateCountries);
countrySelect.addEventListener("change", updateRegions);
regionSelect.addEventListener("change", updateCampusCities);
campusCitySelect.addEventListener("change", updateCutoffOptions);
courseSelect.addEventListener("change", updateCutoffOptions);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const name = String(formData.get("name")).trim();
  const studentCity = String(formData.get("city")).trim();
  const course = String(formData.get("course"));
  const marks12 = Number(formData.get("marks12"));
  const cutoffBand = String(formData.get("cutoff") || "");
  const continent = String(formData.get("continent") || "");
  const country = String(formData.get("country") || "");
  const region = String(formData.get("region") || "");
  const campusCity = String(formData.get("campusCity") || "");

  const courseAndLocationMatches = colleges
    .filter((college) => collegeListsCourse(college, course))
    .filter((college) => !continent || continentFor(college) === continent)
    .filter((college) => !country || college.country === country)
    .filter((college) => !region || college.state === region)
    .filter((college) => !campusCity || college.city === campusCity);
  const inCutoffRange = cutoffBand && cutoffBand !== "not-listed"
    ? courseAndLocationMatches.filter((college) => college.cutoffBand === cutoffBand)
    : [];
  const matches = courseAndLocationMatches
    .filter((college) => !cutoffBand
      || (cutoffBand === "not-listed"
        ? !college.cutoffBand
        : college.cutoffBand === cutoffBand || !college.cutoffBand))
    .sort((a, b) => {
      const aInCity = normalize(a.city) === normalize(studentCity);
      const bInCity = normalize(b.city) === normalize(studentCity);
      return Number(bInCity) - Number(aInCity) || a.name.localeCompare(b.name);
    });

  resultsTitle.textContent = matches.length ? `Course matches, ${name}` : "Let’s try another direction";
  resultsSummary.textContent = matches.length
    ? `These institutions list ${course}. Your ${marks12}% is shown for context${cutoffBand ? `; showing ${cutoffBand === "not-listed" ? "institutions without a comparable published cutoff" : `the ${formatCutoffBand(cutoffBand)} cutoff-range group and additional colleges without a comparable cutoff`}` : ""}. Where shown, cutoff groups are illustrative; international admissions use different criteria and are not directly comparable.`
    : `No institution in this directory currently lists ${course}. Try another course or check an institution’s official site.`;
  resultsCount.textContent = cutoffBand && cutoffBand !== "not-listed"
    ? `${inCutoffRange.length} in range · ${matches.filter((college) => !college.cutoffBand).length} alternatives`
    : `${matches.length} ${matches.length === 1 ? "college" : "colleges"}`;
  resultsGrid.replaceChildren();

  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Try another course or check an institution’s official site.";
    resultsGrid.append(empty);
  } else if (cutoffBand && cutoffBand !== "not-listed") {
    appendCollegeGroup(
      resultsGrid,
      `IN THE ${formatCutoffBand(cutoffBand)} CUTOFF RANGE`,
      matches.filter((college) => college.cutoffBand === cutoffBand),
      studentCity,
    );
    appendCollegeGroup(
      resultsGrid,
      "ADDITIONAL OPTIONS · NO COMPARABLE CUTOFF",
      matches.filter((college) => !college.cutoffBand),
      studentCity,
    );
  } else {
    matches.forEach((college) => resultsGrid.append(createCollegeCard(college, studentCity)));
  }

  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
});

function appendCollegeGroup(container, label, groupColleges, studentCity) {
  if (!groupColleges.length) return;
  const group = document.createElement("div");
  group.className = "results-group";
  const heading = document.createElement("p");
  heading.className = "results-group-heading";
  heading.textContent = label;
  const grid = document.createElement("div");
  grid.className = "results-group-grid";
  groupColleges.forEach((college) => grid.append(createCollegeCard(college, studentCity)));
  group.append(heading, grid);
  container.append(group);
}

async function loadColleges() {
  if (window.location.protocol === "file:") {
    colleges = [...localColleges, ...globalCollegeRows];
    populateCourses();
    populateLocationFilters();
    submitButton.disabled = false;
    formStatus.textContent = `${colleges.length} college profiles ready`;
    return;
  }

  try {
    const response = await fetch("/api/colleges", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Directory request failed (${response.status})`);
    const records = await response.json();
    if (!Array.isArray(records) || records.length === 0) {
      throw new Error("The college directory is empty.");
    }
    colleges = mergeCollegeProfiles(records);
    populateCourses();
    populateLocationFilters();
    submitButton.disabled = false;
    formStatus.textContent = `${colleges.length} college profiles from around the world ready`;
  } catch (error) {
    submitButton.disabled = true;
    formStatus.textContent = "Could not load college data. Refresh the page or restart the local server.";
    console.error("Could not load the CollegeFinder directory:", error);
  }
}

function mergeCollegeProfiles(records) {
  const profiles = new Map();
  [...localColleges, ...globalCollegeRows, ...records].forEach((college) => {
    const normalizedName = normalize(college.name).replace(/[^a-z0-9]/g, "");
    const key = normalizedName === "loyolacollegechennai" ? "loyolacollege" : normalizedName;
    const existing = profiles.get(key);
    if (!existing) {
      profiles.set(key, college);
      return;
    }
    profiles.set(key, {
      ...existing,
      ...college,
      programs: [...new Set([...existing.programs, ...college.programs])],
      cutoffBand: college.cutoffBand || existing.cutoffBand,
    });
  });
  return [...profiles.values()];
}

function populateCourses() {
  const groups = new Map();
  [...new Set(colleges.flatMap((college) => college.programs))]
    .sort((a, b) => a.localeCompare(b))
    .forEach((program) => {
      const groupName = courseGroup(program);
      if (!groups.has(groupName)) groups.set(groupName, document.createElement("optgroup"));
      const option = document.createElement("option");
      option.value = program;
      option.textContent = program;
      groups.get(groupName).append(option);
    });
  groups.forEach((group, label) => {
    group.label = label;
    courseSelect.append(group);
  });
}

function courseGroup(program) {
  if (/^(Computer Science Engineering|Computer Engineering|Electrical|Electronics|Civil|Mechanical|Automobile|Engineering)/i.test(program)) return "Engineering";
  if (/^(Medicine|Medical|MBBS|BDS|Nursing|Dentistry|Biomedical|B\.Pharm|PharmD|Pharmacy)/i.test(program)) return "Medicine & Health Sciences";
  if (/^B\.A\./i.test(program) || program === "B.A") return "Arts";
  if (/^B\.Sc\./i.test(program) || program === "B.Sc" || program === "Science" || program === "Computer Science") return "Science";
  if (/^B\.Com/i.test(program) || program === "B.Com" || program === "Business Administration" || program === "M.B.A") return "Commerce & Management";
  return "Other courses";
}

function collegeListsCourse(college, course) {
  const requestedCourse = normalize(course);
  return college.programs.some((program) => {
    const listedProgram = normalize(program);
    if (listedProgram === requestedCourse) return true;
    if (requestedCourse === "computer science engineering" && listedProgram === "computer science") return true;
    if (requestedCourse === "computer science" && listedProgram === "computer science engineering") return true;
    if (courseGroup(course) === "Engineering" && listedProgram === "engineering") return true;
    return false;
  });
}

function formatCutoffBand(band) {
  return ({
    "190-200": "200 to 190",
    "170-190": "190 to 170",
    "150-170": "170 to 150",
    "below-150": "150 and below",
  })[band] || band;
}

function createCollegeCard(college, studentCity) {
  const card = document.createElement("article");
  card.className = "college-card";

  const topline = document.createElement("div");
  topline.className = "college-topline";
  const type = document.createElement("span");
  type.className = "college-type";
  type.textContent = college.type;
  const region = document.createElement("span");
  region.className = "match-pill";
  region.textContent = normalize(college.city) === normalize(studentCity) ? "IN YOUR CITY" : college.state;
  const admission = document.createElement("span");
  admission.className = "admission-pill";
  admission.textContent = college.cutoffBand
    ? `CUTOFF ${formatCutoffBand(college.cutoffBand)}`
    : "NO COMMON CUTOFF";
  topline.append(type, region, admission);

  const title = document.createElement("h3");
  title.textContent = college.name;
  const location = document.createElement("div");
  location.className = "college-location";
  location.textContent = [college.city, college.state, college.country].filter(Boolean).join(", ");

  const description = document.createElement("p");
  description.className = "college-description";
  description.textContent = college.overview;
  if (college.cutoffBand) {
    description.textContent += ` Indicative demo cutoff band: ${formatCutoffBand(college.cutoffBand)} / 200 (not an official cutoff).`;
  } else {
    description.textContent += " No directly comparable cutoff is listed; check the university's official admission criteria.";
  }

  const fees = document.createElement("div");
  fees.className = "college-fees";
  const feesHeading = document.createElement("strong");
  feesHeading.textContent = `Fees · ${college.fees.period}`;
  const feesSummary = document.createElement("p");
  feesSummary.textContent = college.fees.summary;
  const feesSource = document.createElement("a");
  feesSource.href = college.fees.source;
  feesSource.target = "_blank";
  feesSource.rel = "noopener noreferrer";
  feesSource.textContent = "Official fees / admissions ↗";
  fees.append(feesHeading, feesSummary, feesSource);

  const address = document.createElement("p");
  address.className = "college-address";
  address.textContent = college.address;

  const programs = document.createElement("div");
  programs.className = "program-tags";
  college.programs.forEach((programName) => {
    const tag = document.createElement("span");
    tag.textContent = programName;
    programs.append(tag);
  });

  const contacts = document.createElement("div");
  contacts.className = "college-contacts";
  const contactHeading = document.createElement("strong");
  contactHeading.textContent = "Published college contact";
  contacts.append(contactHeading);
  college.contacts.forEach((contact) => {
    const row = document.createElement("div");
    row.className = "contact-row";
    const role = document.createElement("span");
    role.textContent = contact.designation;
    row.append(role);
    if (contact.phone) {
      const phone = document.createElement("a");
      phone.href = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
      phone.textContent = contact.phone;
      row.append(phone);
    } else {
      const noPhone = document.createElement("span");
      noPhone.textContent = "No direct public number listed";
      row.append(noPhone);
    }
    contacts.append(row);
  });
  if (college.contacts.length === 0) {
    const row = document.createElement("div");
    row.className = "contact-row";
    const note = document.createElement("span");
    note.textContent = "No direct office number is included in this directory.";
    row.append(note);
    contacts.append(row);
  }
  const deanNote = document.createElement("div");
  deanNote.className = "contact-note";
  deanNote.textContent = "Official dean, principal, and admissions line numbers are shown when published by the institution.";
  contacts.append(deanNote);

  const footer = document.createElement("div");
  footer.className = "college-footer";
  const officialLink = document.createElement("a");
  officialLink.className = "map-link";
  officialLink.href = college.website;
  officialLink.target = "_blank";
  officialLink.rel = "noopener noreferrer";
  officialLink.textContent = "Official website ↗";
  const mapLink = document.createElement("a");
  mapLink.className = "source-link";
  mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([college.name, college.address || `${college.city}, ${college.state}, ${college.country}`].filter(Boolean).join(", "))}`;
  mapLink.target = "_blank";
  mapLink.rel = "noopener noreferrer";
  mapLink.textContent = "View on map ↗";
  const sourceLink = document.createElement("a");
  sourceLink.className = "source-link";
  sourceLink.href = college.contactSource;
  sourceLink.target = "_blank";
  sourceLink.rel = "noopener noreferrer";
  sourceLink.textContent = "Contact source";
  const programsLink = document.createElement("a");
  programsLink.className = "source-link";
  programsLink.href = college.programSource;
  programsLink.target = "_blank";
  programsLink.rel = "noopener noreferrer";
  programsLink.textContent = "Programs source";
  footer.append(officialLink, mapLink, sourceLink, programsLink);

  card.append(topline, title, location, description, address, fees, programs, contacts, footer);
  return card;
}

function normalize(value) {
  return String(value).trim().toLocaleLowerCase("en");
}

loadColleges();
