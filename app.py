from rag_engine import answer


print("=" * 60)
print("      LOCAL RAG TERMINAL")
print("=" * 60)
print("Type 'exit' to quit.\n")

while True:

    query = input("Ask Question: ").strip()

    if query.lower() in ["exit", "quit"]:
        print("Goodbye!")
        break

    try:
        response = answer(query)

        print("\n" + "=" * 60)
        print("ANSWER")
        print("=" * 60)
        print(response)
        print()

    except Exception as e:
        print("\nERROR:")
        print(e)
