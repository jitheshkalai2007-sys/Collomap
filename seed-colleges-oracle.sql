CREATE TABLE CollegeProfiles (
    college_id NUMBER PRIMARY KEY REFERENCES Colleges(id),
    state VARCHAR2(100) NOT NULL,
    address VARCHAR2(500) NOT NULL,
    overview VARCHAR2(1000) NOT NULL,
    website VARCHAR2(500) NOT NULL,
    contact_source VARCHAR2(500) NOT NULL,
    program_source VARCHAR2(500) NOT NULL,
    last_verified DATE NOT NULL
);

CREATE TABLE CollegePrograms (
    college_id NUMBER NOT NULL REFERENCES Colleges(id),
    program_name VARCHAR2(150) NOT NULL,
    PRIMARY KEY (college_id, program_name)
);

MERGE INTO Colleges c
USING (
    SELECT 'Indian Institute of Technology Bombay' name, 'GOVERNMENT' type,
           'Powai, Mumbai, Maharashtra, India' location, 0 rating, 0 infra, 0 food, 0 transport FROM dual
) source
ON (c.name = source.name)
WHEN NOT MATCHED THEN INSERT (name, type, location, rating, infra, food, transport)
VALUES (source.name, source.type, source.location, source.rating, source.infra, source.food, source.transport);

MERGE INTO Colleges c
USING (
    SELECT 'Indian Institute of Science' name, 'GOVERNMENT' type,
           'CV Raman Road, Bengaluru, Karnataka, India' location, 0 rating, 0 infra, 0 food, 0 transport FROM dual
) source
ON (c.name = source.name)
WHEN NOT MATCHED THEN INSERT (name, type, location, rating, infra, food, transport)
VALUES (source.name, source.type, source.location, source.rating, source.infra, source.food, source.transport);

MERGE INTO Colleges c
USING (
    SELECT 'National Institute of Technology Tiruchirappalli' name, 'GOVERNMENT' type,
           'Tanjore Main Road, Tiruchirappalli, Tamil Nadu, India' location, 0 rating, 0 infra, 0 food, 0 transport FROM dual
) source
ON (c.name = source.name)
WHEN NOT MATCHED THEN INSERT (name, type, location, rating, infra, food, transport)
VALUES (source.name, source.type, source.location, source.rating, source.infra, source.food, source.transport);

MERGE INTO Colleges c
USING (
    SELECT 'Vellore Institute of Technology' name, 'PRIVATE' type,
           'Vellore, Tamil Nadu, India' location, 0 rating, 0 infra, 0 food, 0 transport FROM dual
) source
ON (c.name = source.name)
WHEN NOT MATCHED THEN INSERT (name, type, location, rating, infra, food, transport)
VALUES (source.name, source.type, source.location, source.rating, source.infra, source.food, source.transport);

MERGE INTO CollegeProfiles p
USING (
    SELECT c.id college_id, 'Maharashtra' state,
           'Powai, Mumbai 400076, Maharashtra, India' address,
           'A public technical institute in Powai. Its official contact page lists the institute board line and separate examination office contacts.' overview,
           'https://www.iitb.ac.in/' website, 'https://www.iitb.ac.in/contact-us' contact_source,
           'https://www.iitb.ac.in/' program_source, DATE '2026-10-07' last_verified
    FROM Colleges c WHERE c.name = 'Indian Institute of Technology Bombay'
) source
ON (p.college_id = source.college_id)
WHEN MATCHED THEN UPDATE SET p.state = source.state, p.address = source.address,
    p.overview = source.overview, p.website = source.website,
    p.contact_source = source.contact_source, p.program_source = source.program_source,
    p.last_verified = source.last_verified
WHEN NOT MATCHED THEN INSERT (college_id, state, address, overview, website, contact_source, program_source, last_verified)
VALUES (source.college_id, source.state, source.address, source.overview, source.website,
        source.contact_source, source.program_source, source.last_verified);

MERGE INTO CollegeProfiles p
USING (
    SELECT c.id college_id, 'Karnataka' state,
           'CV Raman Road, Bengaluru 560012, Karnataka, India' address,
           'A public research institute in Bengaluru. Its contact page publishes a general contact line and a separate International Relations / admissions contact.' overview,
           'https://iisc.ac.in/' website, 'https://iisc.ac.in/contact-us/' contact_source,
           'https://iisc.ac.in/admissions/' program_source, DATE '2026-10-07' last_verified
    FROM Colleges c WHERE c.name = 'Indian Institute of Science'
) source
ON (p.college_id = source.college_id)
WHEN MATCHED THEN UPDATE SET p.state = source.state, p.address = source.address,
    p.overview = source.overview, p.website = source.website,
    p.contact_source = source.contact_source, p.program_source = source.program_source,
    p.last_verified = source.last_verified
WHEN NOT MATCHED THEN INSERT (college_id, state, address, overview, website, contact_source, program_source, last_verified)
VALUES (source.college_id, source.state, source.address, source.overview, source.website,
        source.contact_source, source.program_source, source.last_verified);

MERGE INTO CollegeProfiles p
USING (
    SELECT c.id college_id, 'Tamil Nadu' state,
           'Tanjore Main Road, Tiruchirappalli 620015, Tamil Nadu, India' address,
           'A public technical institute in Tiruchirappalli. Its official contact page links the internal telephone directory; the main line is masked on that page.' overview,
           'https://www.nitt.edu/' website, 'https://www.nitt.edu/home/contact/' contact_source,
           'https://www.nitt.edu/home/academics/' program_source, DATE '2026-10-07' last_verified
    FROM Colleges c WHERE c.name = 'National Institute of Technology Tiruchirappalli'
) source
ON (p.college_id = source.college_id)
WHEN MATCHED THEN UPDATE SET p.state = source.state, p.address = source.address,
    p.overview = source.overview, p.website = source.website,
    p.contact_source = source.contact_source, p.program_source = source.program_source,
    p.last_verified = source.last_verified
WHEN NOT MATCHED THEN INSERT (college_id, state, address, overview, website, contact_source, program_source, last_verified)
VALUES (source.college_id, source.state, source.address, source.overview, source.website,
        source.contact_source, source.program_source, source.last_verified);

MERGE INTO CollegeProfiles p
USING (
    SELECT c.id college_id, 'Tamil Nadu' state,
           'VIT, Vellore 632014, Tamil Nadu, India' address,
           'A private deemed university in Vellore. The official contact page provides the institution contact directory as a document.' overview,
           'https://vit.ac.in/' website, 'https://vit.ac.in/contact-us' contact_source,
           'https://vit.ac.in/programmes-offered-2025-26' program_source, DATE '2026-10-07' last_verified
    FROM Colleges c WHERE c.name = 'Vellore Institute of Technology'
) source
ON (p.college_id = source.college_id)
WHEN MATCHED THEN UPDATE SET p.state = source.state, p.address = source.address,
    p.overview = source.overview, p.website = source.website,
    p.contact_source = source.contact_source, p.program_source = source.program_source,
    p.last_verified = source.last_verified
WHEN NOT MATCHED THEN INSERT (college_id, state, address, overview, website, contact_source, program_source, last_verified)
VALUES (source.college_id, source.state, source.address, source.overview, source.website,
        source.contact_source, source.program_source, source.last_verified);

MERGE INTO Contacts ct
USING (
    SELECT c.id college_id, 'Institute board line' staff_name, 'Institute contact' designation,
           '+91 (22) 2572 2545' phone_number FROM Colleges c
    WHERE c.name = 'Indian Institute of Technology Bombay'
) source
ON (ct.college_id = source.college_id AND ct.designation = source.designation)
WHEN MATCHED THEN UPDATE SET ct.staff_name = source.staff_name, ct.phone_number = source.phone_number
WHEN NOT MATCHED THEN INSERT (college_id, staff_name, designation, phone_number)
VALUES (source.college_id, source.staff_name, source.designation, source.phone_number);

MERGE INTO Contacts ct
USING (
    SELECT c.id college_id, 'JEE Office' staff_name, 'Admissions office' designation,
           '+91 (22) 2576 4063' phone_number FROM Colleges c
    WHERE c.name = 'Indian Institute of Technology Bombay'
) source
ON (ct.college_id = source.college_id AND ct.designation = source.designation)
WHEN MATCHED THEN UPDATE SET ct.staff_name = source.staff_name, ct.phone_number = source.phone_number
WHEN NOT MATCHED THEN INSERT (college_id, staff_name, designation, phone_number)
VALUES (source.college_id, source.staff_name, source.designation, source.phone_number);

MERGE INTO Contacts ct
USING (
    SELECT c.id college_id, 'General contact' staff_name, 'Institute contact' designation,
           '+91 80 2293 2228' phone_number FROM Colleges c
    WHERE c.name = 'Indian Institute of Science'
) source
ON (ct.college_id = source.college_id AND ct.designation = source.designation)
WHEN MATCHED THEN UPDATE SET ct.staff_name = source.staff_name, ct.phone_number = source.phone_number
WHEN NOT MATCHED THEN INSERT (college_id, staff_name, designation, phone_number)
VALUES (source.college_id, source.staff_name, source.designation, source.phone_number);

MERGE INTO Contacts ct
USING (
    SELECT c.id college_id, 'International Relations / admissions' staff_name,
           'Admissions contact' designation, '+91 80 2293 2560' phone_number FROM Colleges c
    WHERE c.name = 'Indian Institute of Science'
) source
ON (ct.college_id = source.college_id AND ct.designation = source.designation)
WHEN MATCHED THEN UPDATE SET ct.staff_name = source.staff_name, ct.phone_number = source.phone_number
WHEN NOT MATCHED THEN INSERT (college_id, staff_name, designation, phone_number)
VALUES (source.college_id, source.staff_name, source.designation, source.phone_number);

MERGE INTO CollegePrograms cp
USING (
    SELECT c.id college_id, p.program_name FROM Colleges c
    CROSS JOIN (
        SELECT 'Computer Science' program_name FROM dual UNION ALL
        SELECT 'Mechanical Engineering' FROM dual UNION ALL
        SELECT 'Business Administration' FROM dual
    ) p
    WHERE c.name IN ('Indian Institute of Technology Bombay',
                     'National Institute of Technology Tiruchirappalli',
                     'Vellore Institute of Technology')
) source
ON (cp.college_id = source.college_id AND cp.program_name = source.program_name)
WHEN NOT MATCHED THEN INSERT (college_id, program_name)
VALUES (source.college_id, source.program_name);

MERGE INTO CollegePrograms cp
USING (
    SELECT c.id college_id, p.program_name FROM Colleges c
    CROSS JOIN (
        SELECT 'Computer Science' program_name FROM dual UNION ALL
        SELECT 'Engineering' FROM dual UNION ALL
        SELECT 'Science' FROM dual
    ) p
    WHERE c.name = 'Indian Institute of Science'
) source
ON (cp.college_id = source.college_id AND cp.program_name = source.program_name)
WHEN NOT MATCHED THEN INSERT (college_id, program_name)
VALUES (source.college_id, source.program_name);
