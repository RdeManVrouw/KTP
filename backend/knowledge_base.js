const inference_engine_txt = `

goal
  max_amount_loan
end

boolean age_valid begin
  return age >= 18 AND age < 65 end
end

number amount_loan begin
  if typeLoan == "car loan" then
    return amount_loan_car end
  end
  if typeLoan == "student loan" then return amount_loan_student end end
  if typeLoan == "house loan" then return amount_loan_house end end
end
input typeLoan "car loan" "student loan" "house loan" end

number amount_loan_car begin
  if has_car_insurance then
    return price_car - amount_car_insurance end
  end
  return price_car end
end
input number has_car_insurance end
input number amount_car_insurance end
input number price_car end

number amount_loan_student begin
  return 666 end
end

number amount_loan_house begin
  return 666 end
end

`;

module.exports = inference_engine_txt;
