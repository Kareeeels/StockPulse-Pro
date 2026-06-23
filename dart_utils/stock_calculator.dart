String classifyStock(double price) {
  if (price > 100) {
    return "Acción de precio alto";
  } else {
    return "Acción de precio accesible";
  }
}

void main() {
  print(classifyStock(124.50));
  print(classifyStock(11.40));
}
