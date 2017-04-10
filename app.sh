read -p "Enter client id:"
echo "$REPLY" > static/user_config.txt
read -p "Enter client secret:"
echo "$REPLY" >> static/user_config.txt

