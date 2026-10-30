# CollegeFinder

CollegeFinder includes a browser-ready website prototype and a Java console starter for college recommendations. The browser app is built with plain HTML/CSS/JavaScript and Node's built-in HTTP server; no npm packages are needed. The Java app keeps marks and personal data encapsulated in immutable model objects, reads college/course/cutoff/contact data through JDBC, ranks eligible colleges using interchangeable strategies, and can fetch driving distances concurrently from the Google Maps Directions API. The Java code requires Java 17 or newer and works with Java 17, 21, or 25; Java 21 is a good default for a new installation.

## Open in Chrome

Open `index.html` directly in Chrome for the local curated and international university directory, or install Node.js, run `npm.cmd start` in this folder, and open `http://localhost:3000` for the full directory.

The browser directory loads its profiles from `data/colleges.json` on the local server and includes institutions across the seven continent choices. Filter by continent, country, state/region, city/campus, course, and admission/cutoff group; available countries and regions follow the selected location, and cutoff groups update to match the selected location and course. The course list includes engineering, medicine and health sciences, arts, science, and commerce options found in the directory. College cards link to each institution's official website and a live Google Maps search. The local engineering demo ranges are 200–190, 190–170, 170–150, and 150 and below on an illustrative /200 scale. They are not official or guaranteed admission cutoffs. Selecting a range shows matching colleges first and also displays Indian and international colleges without comparable cutoffs as separately labeled alternatives. Confirm current courses, eligibility, and fees with each institution.

Festival photographs are illustrative Unsplash images, not photos from the listed campuses. The page credits Unsplash and labels the images as illustrative.

## Java and Oracle starter

Open the repository root as a Maven project in IntelliJ IDEA or Eclipse. Set the project SDK to Java 17, 21, or 25. Maven defaults to Java 17; to compile for a newer installed version, run `mvn -Djava.version=21 package` (or use `25`). Run `src/main/resources/schema-oracle.sql`, followed by `src/main/resources/seed-colleges-oracle.sql`, to create and seed the Oracle college profiles and verified public contacts. The seed intentionally does not invent ratings, facility scores, or admission cutoffs. Then configure:

- `COLLEGE_DB_URL`, for example `jdbc:oracle:thin:@//localhost:1521/FREEPDB1`
- `COLLEGE_DB_USER`
- `GOOGLE_MAPS_API_KEY` (optional; enable Directions API and billing to include distance-based ranking)

Run `com.collegefinder.CollegeFinderApplication` from a terminal. It prompts for the student's details and database password; credentials are not stored in source code. Without a Maps key, recommendations still use marks and college rating/facilities.

Java eligibility currently compares the student's 12th-grade marks with the selected course's cutoff. Its ranking score averages configured strategy scores: marks (10th/12th average), rating/facilities, and—when Maps is configured—distance. The Maps integration uses Google Directions API for driving distance. Google Places data and website scraping are not included; add them only with relevant API access and source-site permissions.
