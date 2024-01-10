const inference_engine_txt = `

goal
  A
end

string A begin
  if -2 == C - 3
  then
    return "valid" end
  end
  return "invalid" end
end

number C begin
  return B + 2 end
end

input number B end

`;
