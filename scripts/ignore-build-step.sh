# If ALL changes are inside docs/, skip the build

# List files changed between last two commits
CHANGED_FILES=$(git diff --name-only HEAD^ HEAD)

# If nothing changed (weird, but be defensive), run the build
if [ -z "$CHANGED_FILES" ]; then
  echo "No changed files; building anyway."
  exit 1
fi

# See if every changed file is under docs/
ONLY_WORKER_CHANGED=true
for FILE in $CHANGED_FILES; do
  case "$FILE" in
    worker/*)
      # ok
      ;;
    *)
      # something outside worker/ changed → must build
      ONLY_WORKER_CHANGED=false
      ;;
  esac
done

if [ "$ONLY_WORKER_CHANGED" = true ]; then
  echo "🛑 Only worker/ changed; skipping build."
  exit 0
else
  echo "✅ App code changed; running build."
  exit 1
fi
