# clinical_records.py
# Group 1 - Division 2
# Authors: Henry, David, and Success
# Assignment: Patient Lifecycle & Identity - Clinical Records (The Heart)


import datetime

# Blood type compatibility mapping
blood_compatability = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'O+': ['O+', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'O-': ['O-'],
    'B-': ['B-', 'O-'],
    'AB-': ['AB-', 'A-', 'B-', 'O-']
}

class ClinicalRecord:
    def __init__(self, patient_id, name, blood_type):
        self.patient_id = patient_id
        self.name = name
        self.blood_type = blood_type
        self.vitals_history = [] # list of dicts
        self.diagnoses = []
        self.blood_donations = [] # keeping track of when they donated

    def add_vitals(self, bp, pulse, temp):
     
        try:
            pulse_int = int(pulse)
            temp_float = float(temp)
            
            if temp_float > 100.4:
                print(f"WARNING: {self.name} has a fever! (Temp: {temp_float})")
            
            tempStuff = {
                'date': str(datetime.datetime.now()),
                'blood_pressure': bp,
                'pulse': pulse_int,
                'temperature': temp_float
            }
            self.vitals_history.append(tempStuff)
            print(f"Vitals added for {self.name}!")
        except Exception as e:
            print("Error: Pulse and temperature must be numeric values.")

    def add_diagnosis(self, doctor_note, illness_name):
        log_entry = {
            'date': str(datetime.datetime.now()),
            'illness': illness_name,
            'notes': doctor_note
        }
        self.diagnoses.append(log_entry)

    def log_blood_donation(self, amount_ml):
        # assuming no one donates more than 500ml at once
        if amount_ml > 500:
            print("Error: Donation amount exceeds safety limit (500ml).")
        else:
            self.blood_donations.append({
                'date': str(datetime.datetime.now()),
                'amount': amount_ml
            })
            print(f"{self.name} donated {amount_ml}ml of blood. Hero!")

    def check_blood_match(self, donor_blood):
        # check if they can receive this blood
        try:
            flag2 = False
            for b in blood_compatability[self.blood_type]:
                if b == donor_blood:
                    flag2 = True
                    break
            
            if flag2:
                print("Blood matches! We can do the transfusion.")
                return True
            else:
                print("Alert: Blood types do not match. Transfusion rejected.")
                return False
        except:
            print("Error checking blood. Did you type it right? e.g., 'A+'")
            return False

