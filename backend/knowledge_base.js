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
  if guarantor_valid and age_guarantor_valid and buy == "yes" then
    return price * 0.8 + (guarantor_disposable_income * 2) end
  else
    return price * 0.8 end
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
    return (1065.43 + mom_dad_rich_factor) * duration_loan_student end
  else
    return 1410.79 * duration_loan_student end
  end
end
input boolean live_with_your_parents end
input number duration_loan_student end

number mom_dad_rich_factor begin
  if mom_monthly_income + dad_monthly_income > 10000 then
    return 10000 - mom_monthly_income - dad_monthly_income end
  end
  return 0 end
end
input number mom_monthly_income end
input number dad_monthly_income end


number amount_loan_house_lower begin
  return 0 end
end

input number loan end

number interest_rate begin
  if type_loan == "car loan" then return 7.9 end end
  if type_loan == "student loan" then return 2.56 end end
  if type_loan == "house loan" then return 12.4 end end
end

`;

module.exports = inference_engine_txt;
