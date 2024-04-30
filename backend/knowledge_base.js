const inference_engine_txt = `

goal
  loan_lower
  loan_upper
  type_loan
  interest_rate
  valid
  loan
end

boolean valid begin
  return age_valid end
end
boolean age_valid begin
  return age >= 18 AND age < 65 end
end
input number age end

number loan_lower begin
  if type_loan == "car loan" then return amount_loan_car_lower end end
  if type_loan == "student loan" then return amount_loan_student_lower end end
  if type_loan == "house loan" then return amount_loan_house_lower end end
end

number loan_upper begin
  if amount_loan_upper > absolute_loan_upper then
    return absolute_loan_upper end
  end
  return amount_loan_upper end
end
number amount_loan_upper begin
  if not valid then return 0 end end
  if type_loan == "car loan" then return amount_loan_car_upper end end
  if type_loan == "student loan" then return amount_loan_student_upper end end
  if type_loan == "house loan" then return amount_loan_house_upper end end
end
input type_loan "car loan" "student loan" "house loan" end

number amount_loan_car_lower begin
  return 0 end
end
number amount_loan_car_upper begin
  if car_age == "old" then
    return 50000 end
  else
    return 20000 end
  end
end
input car_age "old" "new" end
input number price_car end

number amount_loan_house_lower begin
  return 0 end
end
number amount_loan_house_upper begin
  if not guarantor_valid then
    return price end
  else
    return price + (guarantor_disposable_income * 2) end
  end
end
input number price end
input buy "yes" "no" end

number age_guarantor_valid begin
  return age_guarantor >= 18 AND age_guarantor < 65 end
end
input number age_guarantor end

number guarantor_disposable_income begin
  return guarantor_salary - guarantor_expenses end
end
input number guarantor_salary end
input number guarantor_expenses end

boolean guarantor_valid begin
  return guarantor == "yes" end
end
input guarantor "yes" "no" end

number absolute_loan_upper begin
  return max_months_to_pay_back * disposable_income end
end
number max_months_to_pay_back begin
  if type_loan == "car loan" then return 12 * 8 end end
  if type_loan == "student loan" then return 12 * 15 end end
  if type_loan == "house loan" then return 12 * 30 end end
end
number disposable_income begin
  return salary - expenses end
end
number expenses begin
  return amount_other_loans + amount_total_insurance + amount_recurring_expenses + rent end
end
input number salary end
input number amount_other_loans end
input number amount_total_insurance end
input number amount_recurring_expenses end

number rent begin
  if type_loan == "student loan" then
    return amount_student_rent end
  end
  return amount_rent end
end
input number amount_rent end
input number amount_student_rent end

number amount_loan_student_lower begin
  return 0 end
end
number amount_loan_student_upper begin
  if live_with_your_parents then
    return (fees + mom_dad_rich_factor) * duration_loan_student end
  else
    return fees * duration_loan_student end
  end
end
input boolean live_with_your_parents end
input number duration_loan_student end
input number fees end

number mom_dad_rich_factor begin
  if mom_monthly_income + dad_monthly_income > 10000 then
    return 100000 - mom_monthly_income - dad_monthly_income end
  end
  return 0 end
end
input number mom_monthly_income end
input number dad_monthly_income end

input number loan end

number interest_rate begin
  if type_loan == "car loan" then return 7.9 end end
  if type_loan == "student loan" then return 2.56 end end
  if type_loan == "house loan" then return 12.4 end end
end

boolean valid_user begin
  return banker and valid_id and valid_name and valid_age and valid_nat and valid_address and valid_street and valid_employment and valid_salary and valid_expenses and valid_amount_other_loans and valid_amount_total_insurances and valid_amount_recurring_expenses end
end

boolean banker begin
  return banker_number == "1234" end
end
input number banker_number end

boolean valid_id begin
  return valid_date == "valid" end
end
input valid_date "not valid" "valid" end

boolean valid_name begin
  return valid_name == "valid" end
end
input valid_name "valid" "not valid" end

boolean valid_age begin
  return valid_age == "valid" end
end
input valid_age "valid" "not valid" end

boolean valid_nat begin
  return valid_nat == "valid" end
end
input valid_nat "valid" "not valid" end

boolean valid_address begin
  return valid_address == "valid" end
end
input valid_address "valid" "not valid" end

boolean valid_street begin
  return valid_street == "valid" end
end
input valid_street "valid" "not valid" end

boolean valid_employment begin
  return valid_employment == "valid" end
end
input valid_employment "valid" "not valid" end

boolean valid_salary begin
  return valid_salary == "valid"  end
end
input valid_salary "valid" "not valid" end

boolean valid_expenses begin
  return valid_expenses == "valid" end
end
input valid_expenses "valid" "not valid" end

boolean valid_amount_other_loans begin
  return valid_amount_other_loans == "valid" end
end
input valid_amount_other_loans "valid" "not valid" end

boolean valid_amount_total_insurances begin
  return valid_amount_total_insurances == "valid" end
end
input valid_amount_total_insurance "valid" "not valid" end

boolean valid_amount_recurring_expenses begin
  return valid_amount_recurring_expenses == "valid" end
end
input valid_amount_recurring_expenses "valid" "not valid" end

boolean valid_rent begin
  return valid_rent == "valid" end
end
input valid_rent "valid" "not valid" end

boolean valid_guar_id begin
  return valid_guar_id == "valid" end
end
input valid_guar_id "valid" "not valid" end

boolean valid_guar_name begin
  return valid_guar_name == "valid" end
end
input valid_guar_name "valid" "not valid" end

boolean valid_guar_age begin
  return valid_guar_age == "valid" end
end
input valid_guar_age "valid" "not valid" end

boolean valid_guar_nat begin
  return valid_guar_nat == "valid" end
end
input valid_guar_nat "valid" "not valid" end

boolean valid_guar_salary begin
  return valid_guar_salary == "valid" end
end
input valid_guar_salary "valid" "not valid" end

boolean valid_guar_expenses begin
  return valid_guar_expenses == "valid" end
end
input valid_guar_expenses "valid" "not valid" end

boolean valid_guarantor_details begin
  return valid_guar_id and valid_guar_name and valid_guar_age and valid_guar_nat and valid_guar_salary and valid_guar_expenses end
end

boolean valid_price_house begin
  return valid_price_house == "valid" end
end
input valid_price_house "valid" "not valid" end

boolean valid_reno_or_buy begin
  return valid_reno_or_buy == "valid" end
end
input valid_reno_or_buy "valid" "not valid" end

boolean valid_father_income begin
  return valid_father_income == "valid" end
end
input valid_father_income "valid" "not valid" end

boolean valid_mother_income begin
  return valid_mother_income == "valid" end
end
input valid_mother_income "valid" "not valid" end

boolean valid_duration begin
  return valid_duration == "valid" end
end
input valid_duration "valid" "not valid" end

boolean valid_fees begin
  return valid_fees == "valid" end
end
input valid_fees "valid" "not valid" end

boolean valid_car_price begin
  return valid_car_price == "valid" end
end
input valid_car_price "valid" "not valid" end

boolean valid_car_age begin
  return valid_car_age == "valid" end
end
input valid_car_age "valid" "not valid" end

boolean valid_loan begin
  return valid_user and valid_guarantor_details end
end

`;

module.exports = inference_engine_txt;
