const inference_engine_txt = `

goal
  valid
  amount_loan
end

number valid begin
  return iban_valid AND username_valid end
end

number interest_rate begin
  return 1.23 end
end

input number iban_valid username_valid multiple end

number amount_loan begin
  if not valid then
    return 0 end
  end
  return 28872 end
end

`;
