async function fetchJobs() {
      const url = 'https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all';

      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '439ee7559dmshcecb9b51133d143p13b158jsn1b1f7664756c',
          'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const jobs = data.data;
        console.log(data);
        

        const jobList = document.getElementById('jobList');
        jobList.innerHTML = ''; 

        jobs.forEach(job => {
          const jobCard = document.createElement('div');
          jobCard.className = 'job-card';

          const salaryText = job.job_min_salary || job.job_max_salary
            ? `${job.job_min_salary ?? 'N/A'} - ${job.job_max_salary ?? 'N/A'} ${job.job_salary_currency ?? ''} (${job.job_salary_period ?? ''})`
            : 'Not specified';

          jobCard.innerHTML = `
            <div class="job-title">${job.job_title}</div>
            <div class="company">Company: ${job.employer_name}</div>
            <div class="location">Location: ${job.job_city}, ${job.job_state}</div>
            <div class="salary">Salary: ${salaryText}</div>
            <a class="apply-link" href="${job.job_apply_link}" target="_blank">Apply Now</a>
          `;

          jobList.appendChild(jobCard);
        });
      } catch (error) {
        console.error('Error fetching jobs:', error);
        document.getElementById('jobList').innerHTML = '<p style="color:red;">Failed to load job listings.</p>';
      }
    }

    // fetchJobs();